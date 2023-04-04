import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CzarView from '../src/components/Game/CzarView';

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
                <CzarView />
            </BrowserRouter>
        );
        expect(getByText("Confirm")).toBeInTheDocument()
    });

    it('select a card on click', () => {
        const { getByText } = render(
            <BrowserRouter>
                <CzarView />
            </BrowserRouter>
        );
        const card = getByText("sSA")
        expect(card).toBeInTheDocument()
        fireEvent.click(card)
        expect(card.style)

    });



});