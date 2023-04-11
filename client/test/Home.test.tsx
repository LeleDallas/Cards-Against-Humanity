import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import Home from '../src/components/Home/Home';
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

describe('Home', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>

        );
        expect(getByText("Cards Against Humanity? More like ____________.")).toBeInTheDocument()
    });

    it('can navigate between screens', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        const join = getByText('Join room')
        const create = getByText('Create room')
        const rules = getByText('Rules')
        fireEvent.click(join)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
        fireEvent.click(create)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(2)
        fireEvent.click(rules)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(3)
    })

    it('change value based on devices', () => {

        const mockedMobile = vi.fn();
        vi.mock("react-device-detect", async () => {
            const mod = await vi.importActual<typeof import("react-device-detect")>(
                "react-device-detect"
            );
            return {
                ...mod,
                isMobile: () => mockedMobile,
            };
        });
        
        const { queryByAltText, getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(queryByAltText('berry')).not.toBeInTheDocument()
        expect(queryByAltText('jazzHands')).not.toBeInTheDocument()

        const join = getByText('Join room')
        const create = getByText('Create room')
        const rules = getByText('Rules')
        expect(getComputedStyle(join).width).toBe(250)
    })
});