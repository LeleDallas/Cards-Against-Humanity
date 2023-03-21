import http from 'http';
import { io as Client } from "socket.io-client";
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { expect, test, describe, beforeAll, afterAll, beforeEach, it, afterEach } from 'vitest'
import dotenv from 'dotenv';
import { ServerSocket } from '../socket';


dotenv.config();
const port = process.env.PORT;

describe("Default socket test", () => {
    let io: any, serverSocket: any, clientSocket: any;

    beforeAll((done: any) => {
        const httpServer = http.createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            clientSocket = Client(`http://localhost:${port}`);
            io.on("connection", (socket: any) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io?.close();
        clientSocket?.close();
    });

    test("should work", (done: any) => {
        clientSocket.on("hello", (arg: any) => {
            expect(arg).toBe("world");
            done();
        });
        serverSocket && serverSocket.emit("hello", "world");
    });

    test("should work (with ack)", (done: any) => {
        serverSocket &&
            serverSocket.on("hi", (reply: any) => {
                reply("hi!");
            });
        clientSocket.emit("hi", (arg: any) => {
            expect(arg).toBe("hi!");
            done();
        });
    });
});


describe('Server Socket', () => {
    let serverSocket: ServerSocket;

    beforeEach(() => {
        const httpServer: HttpServer = {} as HttpServer;
        serverSocket = new ServerSocket(httpServer);
    });

    it('should create an instance of ServerSocket', () => {
        expect(serverSocket).toBeInstanceOf(ServerSocket);
    });

    it('should get rooms', () => {
        const rooms = serverSocket.getRooms();
        expect(rooms).toBeDefined();
        expect(rooms.size).toBe(0);
    });

    it('should get uid from socket id', () => {
        const socketId = '1234';
        const uid = 'abcd';
        serverSocket.users[uid] = socketId;
        const result = serverSocket.getUidFromSocketID(socketId);
        expect(result).toBe(uid);
    });

    it('should send a message to users', () => {
        const name = 'test_event';
        const payload = { message: 'Hello, World!' };
        const users = ['1234', '5678'];
        serverSocket.sendMessage(name, users, payload); 

    });
});
