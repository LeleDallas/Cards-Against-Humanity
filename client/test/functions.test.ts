import '@testing-library/jest-dom';
import { describe, vi } from 'vitest'
import { createRoom, deleteRoom, drawBlackCard, drawNew, drawWhiteCards, leaveRoom, nextCzar, onConfirm, sendBlack, sendWhiteResponse, setCurrentSolution, startGame } from '../src/hooks/functions';
import { message } from 'antd';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useNavigate } from 'react-router-dom';

const cards = [
    {
        title: "A",
        isBlack: true
    },
    {
        title: "B",
        isBlack: true
    },
    {
        title: "C",
        isBlack: true
    },
    {
        title: "D",
        isBlack: true
    },
    {
        title: "E",
        isBlack: true
    },
    {
        title: "F",
        isBlack: true
    },
    {
        title: "G",
        isBlack: true
    },
]

describe('Functions test', async () => {
    test('createRoom', async () => {
        it('should call message.error if roomName is empty', () => {
            const socket = undefined
            const roomName = ''
            const navigate = vi.fn()
            createRoom(socket, roomName, navigate)
            expect(message.error).toHaveBeenCalledWith('Insert a Lobby name')
            expect(navigate).not.toHaveBeenCalled()
        })

        it('should call socket.emit if roomName is not empty', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            const navigate = vi.fn()
            createRoom(socket, roomName, navigate)
            expect(socket.emit).toHaveBeenCalledWith('create_room', roomName, expect.any(Function))
            expect(navigate).toHaveBeenCalledWith('/waiting', { state: { roomName: 'test-room', type: 'admin' } })
        })
    });

    test('drawBlackCard', async () => {
        const blackCard = drawBlackCard(cards)
        expect(blackCard).not.toBe([])
    });

    test('drawWhiteCards', async () => {
        const whiteCards = drawWhiteCards(cards, 1)
        expect(whiteCards).not.toBe([])
        expect(whiteCards).toHaveLength(1)
    });

    test('drawNew', async () => {
        const playerHand = cards
        const setSelected = vi.fn()
        const setPlayerHand = vi.fn()
        const setHasPlayed = vi.fn()
        const socket = undefined
        expect(playerHand).toHaveLength(7)
        drawNew(socket, "czarSocketId", playerHand, "A", cards, setSelected, setPlayerHand, setHasPlayed)
        expect(playerHand).toHaveLength(7)
    });

    test('setCurrentSolution', async () => {
        const selected = "solution1"
        const setSelected = vi.fn()
        const setSolution = vi.fn()
        const setSelectedUser = vi.fn()
        const userSelected = "string"

        setCurrentSolution("solution2", selected, userSelected, setSelected, setSolution, setSelectedUser)

        expect(setSelected).toHaveBeenCalledWith("solution2")
        expect(setSolution).toHaveBeenCalledWith(true)

        setCurrentSolution("solution1", selected, userSelected, setSelected, setSolution, setSelectedUser)

        expect(setSelected).toHaveBeenCalledWith("")
        expect(setSolution).toHaveBeenCalledWith(false)
    });

    test('sendBlack', async () => {
        it('should not call event if empty', () => {
            const socket = undefined
            const roomName = ''
            sendBlack(socket, "A", roomName);
            expect(socket).not.toHaveBeenCalledWith('send_black_card', roomName, expect.any(Function))
        })
        it('should call sendBlack', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            sendBlack(socket, "A", roomName);
            expect(socket.emit).toHaveBeenCalledWith('send_black_card', roomName, expect.any(Function))
        })
    });
    test('sendWhiteResponse', async () => {
        it('should not call event if empty', () => {
            const socket = undefined
            const roomName = ''
            sendWhiteResponse(socket, "A", roomName, "user");
            expect(socket).not.toHaveBeenCalledWith('send_black_card', roomName, expect.any(Function))
        })
        it('should call send_white_card', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            sendWhiteResponse(socket, "A", roomName, "user");
            expect(socket.emit).toHaveBeenCalledWith('send_white_card', roomName, expect.any(Function))
        })
    });
    test('onConfirm', async () => {
        it('should call request_update_score', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            let oldScore = new Map()
            onConfirm(socket, roomName, oldScore, "A", false)
            expect(socket.emit).toHaveBeenCalledWith('request_update_score', roomName, expect.any(Function))
        })
        it('should call reset_turn', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            let oldScore = new Map()
            onConfirm(socket, roomName, oldScore, "A", false)
            expect(socket.emit).toHaveBeenCalledWith('reset_turn', roomName, false, expect.any(Function))
        })

    });

    test('nextCzar', async () => {
        it('should call update_turn', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            let oldScore = new Map()
            nextCzar(socket, roomName, useNavigate(), "A")
            expect(socket.emit).toHaveBeenCalledWith('update_turn', roomName, "A", expect.any(Function))
        })

    });

    test('startGame', async () => {
        it('should not call event if empty', () => {
            const socket = undefined
            const roomName = ''
            const navigate = vi.fn()
            startGame(socket, "A", navigate);
            expect(socket).not.toHaveBeenCalledWith('request_start_game', roomName, expect.any(Function))
        })
        it('should call request_start_game', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            const navigate = vi.fn()
            startGame(socket, "A", navigate);
            expect(socket.emit).toHaveBeenCalledWith('request_start_game', roomName, expect.any(Function))
            expect(navigate).toHaveBeenCalledWith('/game', { state: { roomName: 'test-room' } })
        })

    });
    test('deleteRoom', async () => {
        it('should not call event if empty', () => {
            const socket = undefined
            const roomName = ''
            const navigate = vi.fn()
            deleteRoom(socket, "A", navigate);
            expect(socket).not.toHaveBeenCalledWith('delete_room', roomName, expect.any(Function))
        })
        it('should call delete_room', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            const navigate = vi.fn()
            deleteRoom(socket, "A", navigate);
            expect(socket.emit).toHaveBeenCalledWith('delete_room', roomName, expect.any(Function))
            expect(navigate).toHaveBeenCalledWith('/game', { state: { roomName: 'test-room' } })
        })
    });
    test('leaveRoom', async () => {
        it('should not call event if empty', () => {
            const socket = undefined
            const roomName = ''
            const navigate = vi.fn()
            deleteRoom(socket, "A", navigate);
            expect(socket).not.toHaveBeenCalledWith('leave_room', roomName, expect.any(Function))
        })
        it('should call leave_room', () => {
            const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
            const roomName = 'test-room'
            const navigate = vi.fn()
            leaveRoom(socket, "A", false, "", navigate);
            expect(socket.emit).toHaveBeenCalledWith('leave_room', roomName, expect.any(Function))
            expect(navigate).toHaveBeenCalledWith('/')
        });
    })
})