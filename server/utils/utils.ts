
import { Socket, Server } from 'socket.io';
import { user } from "../types/user";
import { v4 } from 'uuid';

export const getRooms = (availableRooms: Map<string, Set<string>>,) => {
    const filteredRooms = new Map<string, Array<string>>();

    for (const [roomId, users] of availableRooms.entries()) {
        if (roomId.startsWith("room")) {
            filteredRooms.set(roomId, [...users]);
        }
    }
    return filteredRooms;
};

export const getUsersInRoom = (io: Server, roomName: string) => io.sockets.adapter.rooms.get(roomName)

export const getCurrentRoom = (roomName: string, users: Set<string> | undefined) => {
    if (!users)
        return {
            data: {
                roomName,
                users: JSON.stringify([])
            }
        }
    else
        return {
            data: {
                roomName,
                users: JSON.stringify(users && [...users])
            }
        }
};

export const getUidFromSocketID = (users: user, id: string) =>
    Object.keys(users).find((uid) => users[uid] === id);

export const sendMessage = (messageType: string, users: string[], io: Server, payload?: Object) => {
    console.info(`Emitting event: ${messageType} to`, users);
    users.forEach((id) => (payload ? io.to(id).emit(messageType, payload) : io.to(id).emit(messageType)));
};


export const startListeners = (io: Server, socket: Socket, socketUsers: user) => {

    console.info('Message received from socketId: ' + socket.id);

    socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
        console.info('Handshake received from: ' + socket.id);
        const reconnected = Object.values(socketUsers).includes(socket.id);
        if (reconnected) {
            console.info('This user has reconnected.');
            const uid = getUidFromSocketID(socketUsers, socket.id);
            const users = Object.values(socketUsers);
            if (uid) {
                console.info('Sending callback for reconnect ...');
                callback(uid, users);
                return;
            }
        }

        const uid = v4();
        socketUsers[uid] = socket.id;
        const users = Object.values(socketUsers);
        console.info('Sending callback ...');
        callback(uid, users);

        sendMessage(
            'user_connected',
            users.filter((id) => id !== socket.id),
            io,
            users
        );
    });

    socket.on('disconnect', () => {
        console.info('Disconnect received from: ' + socket.id);

        const uid = getUidFromSocketID(socketUsers, socket.id);

        if (uid) {
            delete socketUsers[uid];
            const users = Object.values(socketUsers);
            sendMessage('user_disconnected', users, io, socket.id);
        }
    });

    socket.on('create_room', (value, callback) => {
        if (io.sockets.adapter.rooms.has("room_" + value)) return
        socket.join("room_" + value);
        const response = { success: true, ...getCurrentRoom("room_" + value, getUsersInRoom(io, "room_" + value)) };
        const response2 = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };

        io.emit("update_rooms", response2);
        callback(response);
    });

    socket.on('delete_room', (value, callback) => {
        console.info(`User ${socket.id} want to delete a room ${value}`);
        io.sockets.in(value).socketsLeave(value)
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        io.emit("update_rooms", response);
        callback(response);
    });

    socket.on('get_rooms', (callback) => {
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        io.emit("update_rooms", response);
        callback(response);
    });

    socket.on('join_room', (value, callback) => {
        if (!io.sockets.adapter.rooms.has(value)) return
        console.info(`User ${socket.id} want to join room ${value}`);
        socket.join(value);
        io.to(value).emit("event");
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        io.emit("update_rooms", response);
        callback(response);
    });

    socket.on('leave_room', (value, callback) => {
        if (!io.sockets.adapter.rooms.has(value)) return
        console.info(`User ${socket.id} want to leave room ${value}`);
        socket.leave(value);
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        callback(response);
    });

    socket.on('request_start_game', (roomName, callback) => {
        if (!io.sockets.adapter.rooms.has(roomName)) return
        let roomPlayers = io.sockets.adapter.rooms.get(roomName)?.size
        if (roomPlayers && roomPlayers < 3) {
            callback({ success: false })
            return
        }
        let randomCzar = roomPlayers && Math.floor(Math.random() * roomPlayers)
        let index = 0
        let isCzar = "user"

        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            if (index === randomCzar) {
                socket.to(socketId).emit("start_game", "czar", roomName)
                if (socketId === socket.id)
                    isCzar = "czar"
            }
            else
                socket.to(socketId).emit("start_game", "user", roomName)
            index++
        })
        const response = { success: true, isCzar };
        callback(response);
    });

    socket.on('send_black_card', (value, roomName, callback) => {
        console.info(`The card is ${value}`);
        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            socket.to(socketId).emit("get_black_card", value)
        })
        const response = { success: true };
        callback(response);
    });

};
