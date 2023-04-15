import { afterAll, beforeAll, beforeEach, describe, expect, it, test, vi } from "vitest";
import { getCurrentRoom, getRooms, getUidFromSocketID, sendMessage, startListeners } from "../utils/utils";
import { io as Client } from "socket.io-client";
import { Server } from "socket.io";
import http from 'http';
import dotenv from 'dotenv';
import { user } from "../types/user";

dotenv.config();
const port = process.env.PORT;
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


describe('Server utils', () => {
    const user1 = 'user1';
    const user2 = 'user2';
    const user3 = 'user3';
    it('should get empty length on no rooms', () => {
        const roomId1 = 'a';
        const roomId2 = 'b';
        const availableRooms = new Map<string, Set<string>>([
            [roomId1, new Set([user1, user2])],
            [roomId2, new Set([user3])]
        ]);
        expect(getRooms(availableRooms)).toHaveLength(0)
    })

    it('should get length of rooms', () => {
        const roomId1 = 'room_a';
        const roomId2 = 'room_b';
        const availableRooms = new Map<string, Set<string>>([
            [roomId1, new Set([user1, user2])],
            [roomId2, new Set([user3])]
        ]);
        expect(getRooms(availableRooms)).toHaveLength(2)
    })

    it('should get empty or room length', () => {
        const roomId1 = 'room_a';
        const failedRoom = 'failed_test';
        const users = new Set<string>();
        expect(getCurrentRoom(failedRoom, users)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": "[]",
                },
            }

        )
        expect(getCurrentRoom(failedRoom, undefined)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": "[]",
                },
            }

        )
        users.add("1");
        users.add("2");
        users.add("3");
        expect(getCurrentRoom(failedRoom, users)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": '["1","2","3"]',
                },
            }
        )
    })

    it('should getUidFromSocketID', () => {
        const roomId1 = 'room_a';
        const failedRoom = 'failed_test';
        const users = new Set<string>();
        expect(getCurrentRoom(failedRoom, users)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": "[]",
                },
            }

        )
        expect(getCurrentRoom(failedRoom, undefined)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": "[]",
                },
            }

        )
        users.add("1");
        users.add("2");
        users.add("3");
        expect(getCurrentRoom(failedRoom, users)).toStrictEqual(
            {
                "data": {
                    "roomName": "failed_test",
                    "users": '["1","2","3"]',
                },
            }
        )
    })

    it('should return the correct uid', () => {
        const users = { 'uid1': 'socket1', 'uid2': 'socket2', 'uid3': 'socket3' };
        const socketId = 'socket2';
        expect(getUidFromSocketID(users, socketId)).toEqual('uid2');
    });

    it('should return undefined if the socket id is not found', () => {
        const users = { 'uid1': 'socket1', 'uid2': 'socket2', 'uid3': 'socket3' };
        const socketId = 'socket4';
        expect(getUidFromSocketID(users, socketId)).toBeUndefined();
    });

    it('should emit the event to all users', () => {
        const users = ['socket1', 'socket2', 'socket3'];
        const messageType = 'testEvent';
        const io2 = {
            ...io,
            to: vi.fn().mockReturnThis(),
            emit: vi.fn()
        };
        sendMessage(messageType, users, io2);
        expect(io2.to).toHaveBeenCalledTimes(3);
        expect(io2.to).toHaveBeenCalledWith('socket1');
        expect(io2.to).toHaveBeenCalledWith('socket2');
        expect(io2.to).toHaveBeenCalledWith('socket3');
        expect(io2.emit).toHaveBeenCalledTimes(3);
        expect(io2.to('socket1').emit).toHaveBeenCalledWith(messageType);
        expect(io2.to('socket2').emit).toHaveBeenCalledWith(messageType);
        expect(io2.to('socket3').emit).toHaveBeenCalledWith(messageType);
    });

    it('should emit the event with the payload to all users', () => {
        const users = ['socket1', 'socket2', 'socket3'];
        const messageType = 'testEvent';
        const payload = { data: 'testData' };
        const io2 = {
            ...io,
            to: vi.fn().mockReturnThis(),
            emit: vi.fn()
        };
        sendMessage(messageType, users, io2, payload);
        expect(io2.to).toHaveBeenCalledTimes(3);
        expect(io2.to).toHaveBeenCalledWith('socket1');
        expect(io2.to).toHaveBeenCalledWith('socket2');
        expect(io2.to).toHaveBeenCalledWith('socket3');
        expect(io2.emit).toHaveBeenCalledTimes(3);
        expect(io2.to('socket1').emit).toHaveBeenCalledWith(messageType, payload);
        expect(io2.to('socket2').emit).toHaveBeenCalledWith(messageType, payload);
        expect(io2.to('socket3').emit).toHaveBeenCalledWith(messageType, payload);
    })
});

describe('startListeners', () => {
    let ioMock = {
        ...io,

    };

    let socketMock = {
        ...serverSocket,
        id: 'socket-id',

    };

    let socketUsersMock: user = {
        'user1': 'Alice',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        ioMock = {
            ...io,
            on: vi.fn(),
            emit: vi.fn(),
            join: vi.fn(),
            leave: vi.fn(),
            to: vi.fn(),
            nsp: {
                to: vi.fn(),
            },
        };

        socketMock = {
            ...serverSocket,
            id: 'socket-id',
            on: vi.fn(),
            emit: vi.fn(),
            join: vi.fn(),
            leave: vi.fn(),
            to: vi.fn(),
            nsp: {
                to: vi.fn(),
            },
        };

        socketUsersMock = {
            'user1': 'Alice',
        };
    });

    it('should set up handshake and disconnect listeners on the socket', () => {
        startListeners(ioMock, socketMock, socketUsersMock);
        expect(socketMock.on).toHaveBeenCalledWith('handshake', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('create_room', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('delete_room', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('get_rooms', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('join_room', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('leave_room', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('request_start_game', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('update_turn', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('request_update_score', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('request_reset_score', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('send_black_card', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('send_white_card', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('reset_white', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledWith('reset_turn', expect.any(Function));
        expect(socketMock.on).toHaveBeenCalledTimes(15);
    });

    it('should handle handshake event for reconnected socket', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        const callbackMock = vi.fn();
        startListeners(ioMock, socketMock, socketUsersMock);

        // Trigger handshake event
        const [eventName, eventHandler] = socketMock.on.mock.calls[0];
        eventHandler(callbackMock);

        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledWith(uid, [socketMock.id]);
        expect(socketMock.emit).toHaveBeenCalledTimes(0);
    });

    it('should handle disconnect event', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        startListeners(ioMock, socketMock, socketUsersMock);

        const [eventName, eventHandler] = socketMock.on.mock.calls[1];
        eventHandler();
        expect(socketUsersMock).not.toHaveProperty(uid);
        expect(socketMock.emit).toHaveBeenCalledTimes(0);
    });

    it('should handle create_room event', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        startListeners(ioMock, socketMock, socketUsersMock);
        const callbackMock = vi.fn();
        const roomName = 'test-room';
        const [eventName, eventHandler] = socketMock.on.mock.calls[2];
        eventHandler(roomName, callbackMock);
        expect(socketMock.join).toHaveBeenCalledTimes(1);
        expect(socketMock.join).toHaveBeenCalledWith('room_' + roomName);
        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledWith({
            "data": {
                "roomName": "room_test-room",
                "users": "[]",
            },
            "success": true,
        });
    });

    it('should handle delete_room event', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        startListeners(ioMock, socketMock, socketUsersMock);
        const callbackMock = vi.fn();
        const roomName = 'delete_room';
        const [eventName, eventHandler] = socketMock.on.mock.calls[3];
        eventHandler(roomName, callbackMock);
        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledWith({
            "data": {},
            "success": true,
        });
    });

    it('should handle get_rooms event', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        startListeners(ioMock, socketMock, socketUsersMock);
        const callbackMock = vi.fn();
        const [eventName, eventHandler] = socketMock.on.mock.calls[5];
        eventHandler(callbackMock);
        expect(callbackMock).toHaveBeenCalledTimes(0);
    });

    it('should handle join_room/leave_room event', () => {
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        startListeners(ioMock, socketMock, socketUsersMock);
        const callbackMock = vi.fn();
        const roomName = 'test-room';
        const [eventName, eventHandler] = socketMock.on.mock.calls[6];
        const [eventCreate, createHandler] = socketMock.on.mock.calls[2];
        const [eventLeave, leaveHandler] = socketMock.on.mock.calls[7];
        createHandler(roomName, callbackMock);
        expect(socketMock.join).toHaveBeenCalledTimes(1);
        expect(socketMock.join).toHaveBeenCalledWith('room_' + roomName);
        expect(callbackMock).toHaveBeenCalledWith({
            "data": {
                "roomName": "room_test-room",
                "users": "[]",
            },
            "success": true,
        });
        socketUsersMock[uid] = socketMock.id;
        eventHandler(roomName, callbackMock, callbackMock);
        expect(socketMock.join).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledTimes(2);
        leaveHandler(roomName, callbackMock)
        expect(callbackMock).toHaveBeenCalledWith({
            "data": {},
            "success": true,
        });
    });


    it('should trigger game actions', () => {
        console.log("THIS")
        startListeners(ioMock, socketMock, socketUsersMock);
        const uid = 'user1';
        socketUsersMock[uid] = socketMock.id;
        const socketIds = ['socket1', 'socket2', 'socket3', 'socket4'];
        const callbackMock = vi.fn();
        const roomName = 'room_test-room';
        ioMock.sockets.adapter.rooms = new Map([[roomName, new Set(socketIds)]]);
        const [create, createRoomHandler] = socketMock.on.mock.calls[2];
        const [join, joinHandler] = socketMock.on.mock.calls[5];
        const [start, startHandler] = socketMock.on.mock.calls[8];
        createRoomHandler(roomName, callbackMock, callbackMock,);
        joinHandler(roomName, callbackMock, callbackMock);
        joinHandler(roomName, callbackMock, callbackMock);
        joinHandler(roomName, callbackMock, callbackMock);
        startHandler(roomName, callbackMock, callbackMock)
        expect(ioMock.to).toHaveBeenCalledTimes(0);

        expect(ioMock.nsp.to).toHaveBeenCalledTimes(0);

        expect(callbackMock).toHaveBeenCalledTimes(5);
        expect(callbackMock).toHaveBeenCalledWith({
            success: true,
            data: {
                "room_test-room": [
                    "socket1",
                    "socket2",
                    "socket3",
                    "socket4",
                ],
            },
        });
    });

    it('should return a failure response if the room does not exist', () => {
        startListeners(ioMock, socketMock, socketUsersMock);
        const callbackMock = vi.fn();
        const roomName = 'test-room';
        const [start, startHandler] = socketMock.on.mock.calls[8];
        ioMock.sockets.adapter.rooms = new Map();
        startHandler(roomName, callbackMock, callbackMock)
        expect(ioMock.to).not.toHaveBeenCalled();
        expect(ioMock.nsp.to).not.toHaveBeenCalled();
        expect(callbackMock).toHaveBeenCalledTimes(0);
    });

    it('should return a failure response if the room has less than 3 players', () => {
        startListeners(ioMock, socketMock, socketUsersMock);
        const socketIds = ['socket1', 'socket2'];
        const callbackMock = vi.fn();
        const roomName = 'test-room';
        const [start, startHandler] = socketMock.on.mock.calls[8];
        ioMock.sockets.adapter.rooms = new Map([[roomName, new Set(socketIds)]]);
        startHandler(roomName, callbackMock, callbackMock)
        expect(ioMock.to).not.toHaveBeenCalled();
        expect(ioMock.nsp.to).not.toHaveBeenCalled();
        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledWith({
            success: false,
        });
    });
})
