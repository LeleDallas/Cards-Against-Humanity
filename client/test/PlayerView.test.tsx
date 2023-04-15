import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import PlayerView from '../src/pages/Game/PlayerView';
import { testStore } from '../src/store/store';
import { Provider } from 'react-redux';
import { SocketContextProvider } from '../src/context/SocketContext';

vi.mock("react-redux", async () => {
    const actual: any = await vi.importActual("react-redux")
    return {
        ...actual,
        useDispatch: vi.fn(),
    }
})

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

describe('Player View', () => {
    it('renders view correctly', () => {
        const { getByText } = render(
            <Provider store={testStore}>
                <BrowserRouter>
                    <PlayerView />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText("Submit Response")).toBeInTheDocument()
    });

    it('renders spinning card', async () => {
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
            <Provider store={testStore}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<PlayerView state={{ state: { roomName: "room1" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByLabelText('loading')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Submit Response'));
        expect(screen.getByText('Submit Response')).toBeEnabled();
    });

    it('renders a black_card', async () => {
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
            black_card: "card____",
            score: new Map(),
            new_turn: false
        };

        const mockNavigate = vi.fn();
        const state = { roomName: 'room1', isCzar: false };
        const socketProvider = ({ children }) => (
            <Provider store={testStore}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/Game', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<PlayerView state={{ state: { roomName: "room1", black_card: "black_card" } }} roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('card____')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Submit Response'));
        expect(screen.getByText('Submit Response')).toBeEnabled();
    });

    it('calls drawNew function when submit button is clicked', () => {
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
                ['player3', 'card3'],
            ]),
            czarSocketId: "",
            black_card: "card____",
            score: new Map(),
            new_turn: false
        };
        const drawNew = vi.fn();
        const setSelected = vi.fn();
        const setPlayerHand = vi.fn();
        const setHasPlayed = vi.fn();
        const state = { roomName: 'room1', isCzar: false };

        const socketProvider = ({ children }) => (
            <Provider store={testStore}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    <MemoryRouter initialEntries={[{ pathname: '/Game', state }]}>
                        {children}
                    </MemoryRouter>
                </SocketContextProvider>
            </Provider>
        )
        render(<PlayerView />, { wrapper: socketProvider });
        const card = screen.getByText(1);
        fireEvent.click(card);
        fireEvent.click(screen.getByText('Submit Response'));
        expect(screen.queryByText('1')).not.toBeInTheDocument()
    });
});
