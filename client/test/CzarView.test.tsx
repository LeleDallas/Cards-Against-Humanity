import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CzarView from '../src/Pages/Game/CzarView';
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

describe('Czar View', () => {
    it('renders view correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CzarView />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText(/Confirm/)).toBeInTheDocument()
    });

    it('renders black card and white card options', async () => {
        const mockState = {
            socket: undefined,
            uid: '',
            users: [],
            rooms: {},
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

        const socketProvider = ({ children }) => (
            <Provider store={store}>
                <SocketContextProvider value={{ socketState: mockState, socketDispatch: () => { } }}>
                    {children}
                </SocketContextProvider>
            </Provider>
        )

        render(<CzarView roomName="room1" navigate={mockNavigate} />, { wrapper: socketProvider });
        expect(screen.getByText('card1')).toBeInTheDocument();
        expect(screen.getByText('card2')).toBeInTheDocument();
        expect(screen.getByText('card3')).toBeInTheDocument();
        fireEvent.click(screen.getByText('card1'));
        expect(screen.getByText('Confirm')).toBeEnabled();
    });

});

