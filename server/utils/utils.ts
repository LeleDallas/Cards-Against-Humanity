
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
    users.forEach((id) => (payload ? io.to(id)?.emit(messageType, payload) : io.to(id)?.emit(messageType)));
};

var host = new Map()
var roomState = new Map()
var czars = new Map()

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
        let newScore = new Map()

        if (uid) {
            io.sockets.adapter.rooms.forEach((room, roomName) => {
                if (roomName.includes("room")) {
                    if (host.get(roomName) === socket.id) {
                        room.forEach((socketId) => {
                            io.sockets.sockets.get(socketId)?.leave(roomName)
                        });
                    }
                    if (roomState.get(roomName)) {
                        let done = false
                        room.forEach(player => {
                            if (player != socket.id && !done && czars.get(roomName) === socket.id) {
                                socket.to(player)?.emit("start_game", "czar", roomName)
                                done = true
                            }
                        })
                    }
                }
            });
            delete socketUsers[uid];
            const users = Object.values(socketUsers);
            const rooms = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
            sendMessage('user_disconnected', users, io, { uid: socket.id, rooms, users });
        }
    });

    socket.on('create_room', (value, callback) => {
        if (io.sockets.adapter.rooms.has("room_" + value)) return
        socket.join("room_" + value);
        host.set("room_" + value, socket.id)
        roomState.set("room_" + value, false)
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
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        io.emit("update_rooms", response);
        callback(response);
    });

    socket.on('leave_room', (roomName, inGame, callback) => {
        console.info(`User ${socket.id} want to leave room ${roomName}`);
        socket.leave(roomName);
        let roomPlayers = io.sockets.adapter.rooms.get(roomName)?.size
        if (roomPlayers && roomPlayers < 3 && inGame) {
            io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
                io.sockets.sockets.get(socketId)?.leave(roomName)
            });
        }
        const response = { success: true, data: Object.fromEntries([...getRooms(io.sockets.adapter.rooms)]) };
        callback(response);
        io.emit("update_rooms", response);
    });

    socket.on('request_start_game', (roomName, callback) => {
        roomState.set(roomName, true)
        if (!io.sockets.adapter.rooms.has(roomName)) return
        let roomPlayers = io.sockets.adapter.rooms.get(roomName)?.size
        if (roomPlayers && roomPlayers < 3) {
            callback({ success: false })
            return
        }
        let randomCzar = roomPlayers && Math.floor(Math.random() * roomPlayers)
        let index = 0
        let isCzar = "user"
        let userScore = new Map<string, number>()

        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            userScore.set(socketId, 0)
            if (index === randomCzar) {
                socket.to(socketId)?.emit("start_game", "czar", roomName)
                czars.set(roomName, socketId)
                if (socketId === socket.id)
                    isCzar = "czar"
            }
            else
                socket.to(socketId)?.emit("start_game", "user", roomName)
            index++
        })
        socket.nsp.to(roomName).emit("update_score", Array.from([...userScore]))

        const response = { success: true, isCzar };
        callback(response);
    });

    socket.on('update_turn', (roomName, newCzarId, callback) => {
        if (!io.sockets.adapter.rooms.has(roomName)) return
        let roomPlayers = io.sockets.adapter.rooms.get(roomName)?.size
        if (roomPlayers && roomPlayers < 3) {
            callback({ success: false })
            return
        }
        let done = false
        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            if (newCzarId === "" && !done) {
                done = true
                socket.to(socketId)?.emit("start_game", "czar", roomName)
                czars.set(roomName, socketId)
            }
            else
                if (socketId === newCzarId) {
                    socket.to(socketId)?.emit("start_game", "czar", roomName)
                    czars.set(roomName, socketId)
                }
                else
                    socket.to(socketId)?.emit("start_game", "user", roomName)
        })
        callback({ success: true });
    });

    socket.on('request_update_score', (roomName: string, userScore: any) => {
        socket.nsp.to(roomName)?.emit("update_score", userScore)
    })

    socket.on('request_reset_score', (roomName: string) => {
        socket.nsp.to(roomName)?.emit("reset_score")
    })

    socket.on('send_black_card', (cardTitle, roomName, czarSocket, callback) => {
        console.info(`The card is ${cardTitle}`);
        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            socket.to(socketId)?.emit("get_black_card", cardTitle, czarSocket)
        })
        callback({ success: true });
    });

    socket.on('send_white_card', (cZarSocketId, card, user, callback) => {
        console.info(`The white card is ${card}`);
        socket.to(cZarSocketId)?.emit("get_white_card", card, user)
        callback({ success: true });
    });

    socket.on('reset_white', (cZarSocketId, callback) => {
        console.info(`Reset White Cards`);
        socket.to(cZarSocketId)?.emit("reset_white_card")
        callback({ success: true });
    });

    socket.on('reset_turn', (roomName, hasPlayed, callback) => {
        io.sockets.adapter.rooms.get(roomName)?.forEach((socketId) => {
            socket.to(socketId)?.emit("new_turn", hasPlayed)
        })
        callback({ success: true });
    });

};
