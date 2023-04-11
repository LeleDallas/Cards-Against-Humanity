import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CzarView from '../src/pages/Game/CzarView';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

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

    it('select a card on click', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CzarView />
                </BrowserRouter>
            </Provider>
        );
        const card = getByText("test1")
        expect(card).toBeInTheDocument()


    });



});