import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Game from '../src/pages/Game/Game';
import { act } from 'react-dom/test-utils';
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

describe('Game', () => {
    const navigate = vi.fn();
    const socket = { on: vi.fn(), emit: vi.fn() };
    const socketState = { socket, rooms: { ["test-room"]: ["a", "b", "c"] } };
    const socketContext = { socketState };

    it('renders without errors', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Game />
                </BrowserRouter>
            </Provider>
        )
        expect(getByText("Go to the homepage")).toBeInTheDocument()
        fireEvent.click(getByText("Go to the homepage"));
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })

    it('renders player game', async () => {
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
        const state = { roomName: 'room1', isCzar: false };
        const socketProvider = ({ children }) => (
            <Provider store={store}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/Game', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<Game state={{ state: { roomName: "room1" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('Submit Response')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Submit Response'));
        expect(screen.getByText('Submit Response')).toBeEnabled();
        fireEvent.click(screen.getByText('Scores'));
        fireEvent.click(screen.getByText('Back'));
        expect(screen.getByText('Are you sure to leave the lobby?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('OK'));
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    });

    it('renders czar game', async () => {
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
        const state = { roomName: 'room1', isCzar: true };
        const socketProvider = ({ children }) => (
            <Provider store={store}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/Game', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<Game state={{ state: { roomName: "room1" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('Submit Response')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Submit Response'));
        expect(screen.getByText('Submit Response')).toBeEnabled();
        fireEvent.click(screen.getByText('Scores'));
        fireEvent.click(screen.getByText('Back'));
        expect(screen.getByText('Are you sure to leave the lobby?')).toBeInTheDocument();
    });

    it('empty player', async () => {
        const mockState = {
            socket: undefined,
            uid: '',
            users: [],
            rooms: {
                "room1": ["a",],
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
        const state = { roomName: 'room1', isCzar: true };
        const socketProvider = ({ children }) => (
            <Provider store={store}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/Game', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<Game state={{ state: { roomName: "room1" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('This room do not exist anymore.')).toBeInTheDocument();
    });
})
