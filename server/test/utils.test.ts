import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentRoom, getRooms, getUidFromSocketID, getUsersInRoom, sendMessage, startListeners } from "../utils/utils";
import { ServerSocket } from "../socket";
import { Server as HttpServer, Server } from 'http';
import { Socket } from "socket.io-client";

describe('Server utils', () => {
    const user1 = 'user1';
    const user2 = 'user2';
    const user3 = 'user3';
    let serverSocket: ServerSocket;
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

})

// describe('start listeners ', () => {

//     let server: Server;
//     let socket: ServerSocket;
//     let socketUsers: any;
  
//     beforeEach(() => {
//       server = new Server();
//       socket = new ServerSocket(server);
//       socketUsers = {};
//     });
  
//     afterEach(() => {
//       server.close();
//     });
  
//     it('should send callback with new user ID and active users on handshake', () => {
//       const callback = vi.fn();
  
//       socket.io.emit('handshake', callback);
  
//       expect(callback).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
//       expect(Object.values(socketUsers)).toContainEqual(expect.any(String));
//     });
  
//     it('should send callback with reconnected user ID and active users on handshake', () => {
//       const uid = '123';
//       socketUsers[uid] = socket.id;
  
//       const callback = vi.fn();
  
//       socket.io.emit('handshake', callback);

//       expect(callback).toHaveBeenCalledWith(uid, expect.any(Array));
//       expect(Object.values(socketUsers)).toContainEqual(expect.any(String));
//     });
  
//     it('should remove user ID and send message on disconnect', () => {
//       const uid = '123';
//       socketUsers[uid] = socket.id;
  
//       socket.io.emit('disconnect');
  
//       expect(socketUsers[uid]).toBeUndefined();
//       expect(socket.io.emit).toHaveBeenCalledWith('user_disconnected', expect.any(Array), socket.id);
//     });
//   });
