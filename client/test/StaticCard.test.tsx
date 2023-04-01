import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, assert } from 'vitest'
import { render } from '@testing-library/react';
import StaticCard from '../src/components/Cards/StaticCard';


describe('BlackCard', () => {
    it('renders card correctly', () => {
        const { getByText } = render(
            <StaticCard />
        );
        expect(getByText("Cards Against Humanity")).toBeInTheDocument()
    });
});