import http from 'http';
import { io as Client } from "socket.io-client";
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { expect, test, describe, beforeAll, afterAll, beforeEach, it } from 'vitest'
import dotenv from 'dotenv';
import { ServerSocket } from '../socket';
import { getCurrentRoom, getUidFromSocketID, getUsersInRoom, sendMessage } from '../utils/utils';


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
    let httpServer: HttpServer;

    beforeEach(() => {
        httpServer = {} as HttpServer;
        serverSocket = new ServerSocket(httpServer);
    });

    it('should create an instance of ServerSocket', () => {
        expect(serverSocket).toBeInstanceOf(ServerSocket);
    });

    it('should get uid from socket id', () => {
        const socketId = '1234';
        const uid = 'abcd';
        serverSocket.users[uid] = socketId;
        const result = getUidFromSocketID(serverSocket.users, socketId);
        expect(result).toBe(uid);
    });

    it('should send a message to users', () => {
        const name = 'test_event';
        const payload = { message: 'Hello, World!' };
        const users = ['1234', '5678'];
        sendMessage(name, users, serverSocket.io, payload);
    });


    it('should return the current room when getCurrentRoom is called', () => {
        const lobbyName = 'room1';
        const user1 = 'user1';
        const user2 = 'user2';
        const room = new Set([user1, user2]);
        (serverSocket.io.sockets.adapter as any).rooms.set(lobbyName, room);

        const result = getCurrentRoom(lobbyName, getUsersInRoom(serverSocket.io, lobbyName));
        expect(result).toEqual({
            data: {
                lobbyName,
                users: JSON.stringify([...room])
            }
        });
    });

    it('should return the UID from the socket ID when getUidFromSocketID is called', () => {
        const uid1 = '123';
        const uid2 = '456';
        serverSocket.users = {
            [uid1]: 'socket1',
            [uid2]: 'socket2'
        };
        const result1 = getUidFromSocketID(serverSocket.users, 'socket1');
        const result2 = getUidFromSocketID(serverSocket.users, 'socket2');
        const result3 = getUidFromSocketID(serverSocket.users, 'socket3');
        expect(result1).toEqual(uid1);
        expect(result2).toEqual(uid2);
        expect(result3).toBeUndefined();
    });
});