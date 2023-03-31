import React from 'react';
import '@testing-library/jest-dom';
import { expect, it, describe, afterEach, vitest } from 'vitest'
import { cleanup, render, } from '@testing-library/react';
import ErrorRoute from "../src/route/ErrorRoute"
import { BrowserRouter } from 'react-router-dom';

describe('ErrorRoute', async () => {

    const { getByText } = render(
        <BrowserRouter>
            <ErrorRoute />
        </BrowserRouter>

    );

    afterEach(() => {
        cleanup();
        vitest.resetAllMocks();
    });

    it('render correctly', async () => {
        expect(getByText(/Oops!/)).toBeInTheDocument()
        expect(getByText(/Sorry, an unexpected error has occurred./)).toBeInTheDocument()
    });

});