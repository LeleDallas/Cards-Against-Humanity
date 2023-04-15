import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import WaitingLobby from '../src/pages/Lobby/WaitingLobby';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
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

describe("WaitingLobby", () => {
    const state = { roomName: "test-room", type: "admin" };
    const navigate = vi.fn();
    const deleteRoom = vi.fn();
    const leaveRoom = vi.fn();
    const startGame = vi.fn();
    const socket = { on: vi.fn(), emit: vi.fn() };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should first', () => {
        it("renders a back button", () => {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            const backButton = getByText("Back");

            expect(backButton).toBeInTheDocument();
        });


        it("calls leaveRoom when back button is clicked", () => {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            const backButton = getByText("Back");

            fireEvent.click(backButton);

            expect(leaveRoom).toHaveBeenCalledWith(socket, state.roomName, navigate);
        });

        it("calls deleteRoom when back button is clicked and user is admin", () => {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            const backButton = getByText("Back");

            fireEvent.click(backButton);

            expect(deleteRoom).not.toHaveBeenCalled();

            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            fireEvent.click(backButton);

            expect(deleteRoom).toHaveBeenCalledWith(socket, state.roomName, navigate);
        });

        it("renders a start game button when user is admin and room has players", () => {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            expect(getByText("Start Game")).toBeInTheDocument();
        });

        it("calls startGame when start game button is clicked", () => {
            const { getByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );

            const startGameButton = getByText("Start Game");

            fireEvent.click(startGameButton);

            expect(startGame).toHaveBeenCalledWith(socket, state.roomName, navigate);
        });

        it("does not render a start game button when user is not admin or room does not have players", () => {
            const { queryByText } = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );
            expect(queryByText("Start Game")).not.toBeInTheDocument();

            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <WaitingLobby />
                    </BrowserRouter>
                </Provider>
            );
            expect(queryByText("Start Game")).not.toBeInTheDocument();
        });
    })


    it('renders without errors', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <WaitingLobby />
                </BrowserRouter>
            </Provider>
        )
        expect(getByText(/Back/)).toBeInTheDocument()
        expect(getByText(/Go to the homepage/)).toBeInTheDocument()
    })

    it('fire buttons event', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <WaitingLobby />
                </BrowserRouter>
            </Provider>
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
            <Provider store={store}>
                <BrowserRouter>
                    <WaitingLobby />
                </BrowserRouter>
            </Provider>
        )
        const back = getByText(/Back/)
        fireEvent.click(back)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(0)
    })


    it('renders admin waiting lobby', async () => {
        const socket = { on: vi.fn(), emit: vi.fn() };
        const mockState = {
            socket: undefined,
            uid: '',
            users: [],
            rooms: {
                "room1": ["a", "b", "c"],
                "room2": ["a", "b", "c"],
                "room3": ["a", "b", "c"],
            },
            white_card: new Map([
                ['player1', 'card1'],
                ['player2', 'card2'],
                ['player3', 'card3']
            ]),
            czarSocketId: "",
            black_card: "",
            score: new Map(),
            new_turn: false
        };

        const mockNavigate = vi.fn();
        const state = { roomName: 'room1', type: "admin" };
        const socketProvider = ({ children }) => (
            <Provider store={store}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/waiting', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<WaitingLobby state={{ state: { roomName: "room1" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('Start Game')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Start Game'));
        expect(mockNavigate).toHaveBeenCalledTimes(0)
    });

});