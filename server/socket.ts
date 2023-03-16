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
        this.io.on('connect', this.StartListeners);
    }

    StartListeners = (socket: Socket) => {
        console.info('Message received from socketId: ' + socket.id);

        socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
            console.info('Handshake received from: ' + socket.id);
            const reconnected = Object.values(this.users).includes(socket.id);
            if (reconnected) {
                console.info('This user has reconnected.');
                const uid = this.GetUidFromSocketID(socket.id);
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

            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('send_message', () => {
            const uid = this.GetUidFromSocketID(socket.id);
        })

        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);

            const uid = this.GetUidFromSocketID(socket.id);

            if (uid) {
                delete this.users[uid];

                const users = Object.values(this.users);

                this.SendMessage('user_disconnected', users, socket.id);
            }
        });
        socket.on('create_room', (value) => {
            console.info(`User ${socket.id} want to create a room ${value}`);
            socket.join(value);
        });
        socket.on('join_room', (value) => {
            console.info(`User ${socket.id} want to join room ${value}`);
            socket.join(value);
            this.io.to(value).emit("event");
        });
    };

    GetUidFromSocketID = (id: string) => {
        return Object.keys(this.users).find((uid) => this.users[uid] === id);
    };

    SendMessage = (name: string, users: string[], payload?: Object) => {
        console.info(`Emitting event: ${name} to`, users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    };
}