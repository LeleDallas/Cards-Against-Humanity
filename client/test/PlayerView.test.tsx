import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayerView from '../src/pages/Game/PlayerView';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';

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
            <Provider store={store}>
                <BrowserRouter>
                    <PlayerView />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText("Submit Response")).toBeInTheDocument()
    });

});
