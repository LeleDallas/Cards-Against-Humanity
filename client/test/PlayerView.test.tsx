import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayerView from '../src/pages/Game/PlayerView';

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
            <BrowserRouter>
                <PlayerView />
            </BrowserRouter>
        );
        expect(getByText("Submit Response")).toBeInTheDocument()
    });

    it('select a card on click', () => {
        const { getByText } = render(
            <BrowserRouter>
                <PlayerView />
            </BrowserRouter>
        );
        const card = getByText("1")
        expect(card).toBeInTheDocument()
        fireEvent.click(card)
        expect(card.style)

    });



});