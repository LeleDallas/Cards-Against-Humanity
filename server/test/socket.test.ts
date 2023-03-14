import http from 'http';
import { io as Client } from "socket.io-client";
import { Server } from 'socket.io';
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

describe("Socket test", () => {
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
        io.close();
        clientSocket.close();
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