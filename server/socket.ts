import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { user } from './types/user';

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;
    public users: user;

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.startListeners);
    }

    getRooms = () => {
        const availableRooms: Map<string, Set<string>> = this.io.sockets.adapter.rooms;
        const filteredRooms = new Map<string, Array<string>>();

        for (const [roomId, users] of availableRooms.entries()) {
            if (roomId.startsWith("room")) {
                filteredRooms.set(roomId, [...users]);
            }
        }
        return filteredRooms;
    };

    getCurrentRoom = (lobbyName: string) => {
        let users = this.io.sockets.adapter.rooms.get(lobbyName)
        return {
            data: {
                lobbyName,
                users: JSON.stringify(users && [...users])
            }
        }
    };

    getUidFromSocketID = (id: string) => {
        return Object.keys(this.users).find((uid) => this.users[uid] === id);
    };

    sendMessage = (name: string, users: string[], payload?: Object) => {
        console.info(`Emitting event: ${name} to`, users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    };

    startListeners = (socket: Socket) => {
        console.info('Message received from socketId: ' + socket.id);

        socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
            console.info('Handshake received from: ' + socket.id);
            const reconnected = Object.values(this.users).includes(socket.id);
            if (reconnected) {
                console.info('This user has reconnected.');
                const uid = this.getUidFromSocketID(socket.id);
                const users = Object.values(this.users);
                if (uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                }
            }

            const uid = v4();
            this.users[uid] = socket.id;
            const users = Object.values(this.users);
            console.info('Sending callback ...');
            callback(uid, users);

            this.sendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('send_message', () => {
            const uid = this.getUidFromSocketID(socket.id);
        })

        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);

            const uid = this.getUidFromSocketID(socket.id);

            if (uid) {
                delete this.users[uid];
                const users = Object.values(this.users);
                this.sendMessage('user_disconnected', users, socket.id);
            }
        });

        socket.on('create_room', (value, callback) => {
            if (this.io.sockets.adapter.rooms.has("room_" + value)) return
            socket.join("room_" + value);
            const response = { success: true, ...this.getCurrentRoom("room_" + value) };
            const response2 = { success: true, data: Object.fromEntries([...this.getRooms()]) };

            this.io.emit("update_rooms", response2);
            callback(response);
        });

        socket.on('delete_room', (value, callback) => {
            console.info(`User ${socket.id} want to delete a room ${value}`);
            this.io.sockets.in(value).socketsLeave(value)
            const response = { success: true, data: Object.fromEntries([...this.getRooms()]) };
            this.io.emit("update_rooms", response);
            callback(response);
        });

        socket.on('get_rooms', (callback) => {
            const response = { success: true, data: Object.fromEntries([...this.getRooms()]) };
            this.io.emit("update_rooms", response);
            callback(response);
        });

        socket.on('join_room', (value, callback) => {
            if (!this.io.sockets.adapter.rooms.has(value)) return
            console.info(`User ${socket.id} want to join room ${value}`);
            socket.join(value);
            this.io.to(value).emit("event");
            const response = { success: true, data: Object.fromEntries([...this.getRooms()]) };
            this.io.emit("update_rooms", response);
            callback(response);
        });

        socket.on('leave_room', (value, callback) => {
            if (!this.io.sockets.adapter.rooms.has(value)) return
            console.info(`User ${socket.id} want to leave room ${value}`);
            socket.leave(value);
            this.io.to(value).emit("leave_event");
            const response = { success: true, data: Object.fromEntries([...this.getRooms()]) };
            callback(response);
        });

        socket.on('start_game', (roomName, callback) => {
            if (!this.io.sockets.adapter.rooms.has("room_" + roomName)) return
            let roomPlayers = this.io.sockets.adapter.rooms.get("room_" + roomName)?.size
            if (roomPlayers && roomPlayers < 4) return

            console.info(`User ${socket.id} want to start game in ${roomName}`);
            socket.emit("start_game_player")
            const response = { success: true, data: Object.fromEntries([...this.getRooms()]) };
            callback(response);
        });
    };
}