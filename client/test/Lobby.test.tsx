import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, beforeEach } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Lobby from '../src/components/Lobby/Lobby';
import { defaultSocketContextState } from '../src/context/SocketContext';
import { Manager, Socket } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';

describe('Lobby component', () => {
    let lobbyRenderResult;
    const mockUid = '123'
    const mockRooms = {}
    const mockSocket = defaultSocketContextState
    beforeEach(() => {
        lobbyRenderResult = render(
            <BrowserRouter>
                <Lobby
                    socket={defaultSocketContextState.socket}
                    users={defaultSocketContextState.users}
                    uid={mockUid}
                    rooms={mockRooms}
                />
            </BrowserRouter>
        )
    });

    it('renders without errors', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        expect(getByText(/Users Online:/)).toBeInTheDocument()
    })

    it('shows error message when creating lobby with empty name', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        const createLobbyButton = await waitFor(() => getByText(/Create Lobby/))
        fireEvent.click(createLobbyButton)
        await waitFor(() => {
            const lobbyAlert = getByText(/Insert a Lobby name/)
            expect(lobbyAlert).toBeInTheDocument();
        });
    })
})