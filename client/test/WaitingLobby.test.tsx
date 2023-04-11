import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import WaitingLobby from '../src/pages/Lobby/WaitingLobby';

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
})