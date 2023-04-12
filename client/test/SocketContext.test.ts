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
        const stateWithUsers = { ...initialState, users: mockUsers };
        const newState = socketReducer(stateWithUsers, action);

        expect(newState.users).toEqual(['user2']);
    });
});