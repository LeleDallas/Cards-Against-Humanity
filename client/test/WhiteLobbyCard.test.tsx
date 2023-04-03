import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import WhiteLobbyCard from '../src/components/Cards/WhiteLobbyCard';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router-dom'

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

const mockRoom = {
    players: ["Player1", "Player2"],
    title: "Test",
}
const noPlayers = {
    players: undefined,
    title: "Test",
}

describe('WhiteLobbyCard guest', () => {
    it('renders guest card correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WhiteLobbyCard join players={mockRoom.players} lobbyName={mockRoom.title} />
            </BrowserRouter>

        );
        expect(getByText("Test")).toBeInTheDocument()
        expect(getByText("Connect")).toBeInTheDocument()
        expect(getByText("Player1")).toBeInTheDocument()
        expect(getByText("Player2")).toBeInTheDocument()
    });

    it('show alert on no player room', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WhiteLobbyCard join players={noPlayers.players} lobbyName={mockRoom.title} />
            </BrowserRouter>
        );
        expect(getByText('This room do not exist anymore.')).toBeInTheDocument()
    })
});


describe('WhiteLobbyCard host', () => {
    it('renders host card correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WhiteLobbyCard players={mockRoom.players} lobbyName={mockRoom.title} />
            </BrowserRouter>

        );
        expect(getByText("Test")).toBeInTheDocument()
        expect(getByText("Player1")).toBeInTheDocument()
        expect(getByText("Player2")).toBeInTheDocument()
    });

    it('can navigate between screens', () => {
        const { getByText } = render(
            <BrowserRouter>
                <WhiteLobbyCard join players={mockRoom.players} lobbyName={mockRoom.title} />
            </BrowserRouter>
        );
        const connect = getByText('Connect')
        fireEvent.click(connect)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(0)
    })
});