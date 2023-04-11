import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, beforeEach, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Lobby from '../src/pages/Lobby/Lobby';
import { BrowserRouter } from 'react-router-dom';

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

describe('Lobby component', () => {
    let lobbyRenderResult;
    beforeEach(() => {
        lobbyRenderResult = render(
            <BrowserRouter>
                <Lobby />
            </BrowserRouter>
        )
    });

    it('renders without errors', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        expect(getByText(/Users Online:/)).toBeInTheDocument()
    })

    it('fire back event', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        expect(getByText(/Back/)).toBeInTheDocument()
        fireEvent.click(getByText(/Back/))
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })

    it('fire refresh event', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        expect(getByText(/Refresh/)).toBeInTheDocument()
        fireEvent.click(getByText(/Refresh/))
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })
})