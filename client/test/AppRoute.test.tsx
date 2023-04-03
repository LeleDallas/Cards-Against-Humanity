
import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';
import AppRoute from '../src/route/AppRoute';


describe('BlackCard', () => {
    it('renders card correctly', () => {
        const { getByText } = render(
            <AppRoute />
        );
        expect(getByText("Cards Against Humanity")).toBeInTheDocument()
    });
});