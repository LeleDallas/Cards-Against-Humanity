import React from 'react';
import '@testing-library/jest-dom';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render, } from '@testing-library/react';
import ErrorRoute from "../src/route/ErrorRoute"
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

describe('ErrorRoute', () => {

    it('render correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ErrorRoute />
            </BrowserRouter>

        );
        expect(getByText(/Oops!/)).toBeInTheDocument()
        expect(getByText(/Sorry, an unexpected error has occurred./)).toBeInTheDocument()
    });

    it('fire click event', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ErrorRoute />
            </BrowserRouter>

        );
        const button = getByText("Go to homepage")
        expect(button).toBeInTheDocument()
        fireEvent.click(button)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)

    });

});