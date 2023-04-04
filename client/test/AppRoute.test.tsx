
import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';
import AppRoute from '../src/route/AppRoute';
import { BrowserRouter } from 'react-router-dom';

describe('AppRoute', () => {
    it('renders route correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <AppRoute />
            </BrowserRouter>
        );
        expect(getByText("Cards Against Humanity")).toBeInTheDocument()
    });
});