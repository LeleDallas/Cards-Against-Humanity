import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import CreateLobby from "../src/pages/Lobby/CreateLobby"
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

describe('Create Lobby', () => {
    it('renders form correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <CreateLobby />
            </BrowserRouter>
        );
        expect(getByText("Create Lobby")).toBeInTheDocument()
    });

    it('fire events onclick', () => {
        const { getByText, getByPlaceholderText } = render(
            <BrowserRouter>
                <CreateLobby />
            </BrowserRouter>
        );
        const back = getByText('Back')
        const create = getByText('Create Lobby')
        expect(back).toBeInTheDocument()
        expect(getByPlaceholderText("Insert a lobby name")).toBeInTheDocument()
        expect(create).toBeInTheDocument()
        fireEvent.click(back)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
        fireEvent.click(create)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    });
});