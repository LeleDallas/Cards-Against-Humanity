import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import WaitingLobby from '../src/pages/Lobby/WaitingLobby';
import { SocketContextProvider } from '../src/context/SocketContext';

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const mod = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...mod,
        useNavigate: () => mockedUseNavigate,
    };
});

describe('Waiting Lobby component', () => {

    it('renders without errors', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WaitingLobby />
            </BrowserRouter>
        )
        expect(getByText(/Back/)).toBeInTheDocument()
        expect(getByText(/Go to the homepage/)).toBeInTheDocument()
    })

    it('fire buttons event', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WaitingLobby />
            </BrowserRouter>
        )

        const start = getByText(/Go to the homepage/)
        fireEvent.click(start)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })

    it('fire back event', () => {
        mockedUseNavigate.mockReturnValueOnce({
            pathname: '/path',
            search: '',
            hash: '',
            state: { roomName: "test", type: "admin" },
        });
        const { getByText } = render(
            <BrowserRouter>
                <WaitingLobby />
            </BrowserRouter>
        )
        const back = getByText(/Back/)
        fireEvent.click(back)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })

    // it('calls leaveRoom function on click', () => {
    //     const leaveRoom = vi.fn();
    //     const navigate = vi.fn();
    //     const socketState = { socket: {}, rooms: [] };
    //     const location = { state: { type: 'user', roomName: 'Test Room' } };
    //     const { getByRole } = render(
    //         <BrowserRouter>
    //             <SocketContextProvider value={socketState}>
    //                 <WaitingLobby navigate={navigate} leaveRoom={leaveRoom} location={location} />
    //             </SocketContextProvider>
    //         </BrowserRouter>
    //     );
    //     const backButton = getByRole('button');
    //     fireEvent.click(backButton);
    //     expect(leaveRoom).toHaveBeenCalledWith(socketState.socket, location.state.roomName, navigate);
    // });

    // test('calls deleteRoom function on confirm', () => {
    //     const deleteRoom = jest.fn();
    //     const navigate = jest.fn();
    //     const socketState = { socket: {}, rooms: [] };
    //     const location = { state: { type: 'admin', roomName: 'Test Room' } };
    //     const { getByRole } = render(
    //         <BrowserRouter>
    //             <WaitingLobby socketState={socketState} navigate={navigate} deleteRoom={deleteRoom} location={location} />
    //         </BrowserRouter>
    //     );
    //     const backButton = getByRole('button');
    //     fireEvent.click(backButton);
    //     const confirmButton = getByRole('button', { name: 'Yes' });
    //     fireEvent.click(confirmButton);
    //     expect(deleteRoom).toHaveBeenCalledWith(socketState.socket, location.state.roomName, navigate);
    // });
})