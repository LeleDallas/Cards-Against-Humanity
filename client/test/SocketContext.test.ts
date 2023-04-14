import '@testing-library/jest-dom';
import { describe } from 'vitest'
import { Socket } from 'socket.io-client';
import { SocketContextActionsPayload, SocketContextState, defaultSocketContextState, socketReducer } from '../src/context/SocketContext';

describe('socketReducer', () => {
    let initialState: SocketContextState;

    beforeEach(() => {
        initialState = defaultSocketContextState;
    });

    it('should update the socket when update_socket action is dispatched', () => {
        const mockSocket: Socket = {} as Socket;
        const action: SocketContextActionsPayload = { type: 'update_socket', payload: mockSocket };
        const newState = socketReducer(initialState, action);
        expect(newState.socket).toEqual(mockSocket);
    });

    it('should update the uid when update_uid action is dispatched', () => {
        const mockUid = '123';
        const action: SocketContextActionsPayload = { type: 'update_uid', payload: mockUid };
        const newState = socketReducer(initialState, action);

        expect(newState.uid).toEqual(mockUid);
    });

    it('should update the users when update_users action is dispatched', () => {
        const mockUsers = ['user1', 'user2'];
        const action: SocketContextActionsPayload = { type: 'update_users', payload: mockUsers };
        const newState = socketReducer(initialState, action);

        expect(newState.users).toEqual(mockUsers);
    });

    it('should remove a user when remove_user action is dispatched', () => {
        const mockUsers = ['user1', 'user2'];
        const action: SocketContextActionsPayload = { type: 'remove_user', payload: 'user1' };
        const state = { ...initialState, users: mockUsers };
        const newState = socketReducer(state, action);
        expect(newState.users).toEqual(['user2']);
    });

    it('should update rooms ', () => {
        const mockRooms = ['user1', 'user2'];
        const action: SocketContextActionsPayload = { type: 'update_rooms', payload: mockRooms };
        const stateWithRooms = { ...initialState, rooms: [] };
        const newState = socketReducer(stateWithRooms, action);
        expect(newState.rooms).toEqual(mockRooms);
    });

    it('should get a black card', () => {
        const action: SocketContextActionsPayload = { type: 'get_black_card', payload: 'new' };
        const state = { ...initialState, black_card: "" };
        const newState = socketReducer(state, action);
        expect(newState.black_card).toEqual("new");
    });
    it('should set the new czar', () => {
        const action: SocketContextActionsPayload = { type: 'set_czar', payload: 'user1' };
        const state = { ...initialState, czarSocketId: "" };
        const newState = socketReducer(state, action);
        expect(newState.czarSocketId).toEqual("user1");
    });
    it('should get white card', () => {
        let payload = {
            user: "a",
            cardTitle: "b"
        }
        const action: SocketContextActionsPayload = { type: 'get_white_card', payload: payload };
        const state = { ...initialState, white_card: new Map() };
        const newState = socketReducer(state, action);
        let res = new Map()
        expect(newState.white_card).toEqual(new Map().set(payload.user, payload.cardTitle));
    });
    it('should reset white card', () => {
        const action: SocketContextActionsPayload = { type: 'reset_white_card', payload: "" };
        const state = { ...initialState, white_card: new Map() };
        const newState = socketReducer(state, action);
        expect(newState.white_card).toEqual(new Map());
    });
    it('should update score', () => {
        let payload = new Map()
        payload.set("a", 1)
        payload.set("b", 3)
        const action: SocketContextActionsPayload = { type: 'update_score', payload };
        const state = { ...initialState, score: new Map() };
        const newState = socketReducer(state, action);
        expect(newState.score).toEqual(payload);
    });
    it('should reset score', () => {
        let payload = new Map()
        payload.set("a", 1)
        payload.set("b", 3)
        const action: SocketContextActionsPayload = { type: 'reset_score', payload: "" };
        const state = { ...initialState, score: payload };
        const newState = socketReducer(state, action);
        expect(newState.score).toEqual(new Map());
    });

    it('should trigger new turn', () => {
        const action: SocketContextActionsPayload = { type: 'new_turn', payload: true };
        const state = { ...initialState, new_turn: false };
        const newState = socketReducer(state, action);
        expect(newState.new_turn).toEqual(true);
    });

});