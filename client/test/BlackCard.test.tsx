import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';
import BlackCard from '../src/components/Cards/BlackCard';


describe('BlackCard', () => {
  it('renders card correctly', () => {
    const { getByText } = render(
      <BlackCard />
    );
    expect(getByText("Cards Against Humanity? More like ____________.")).toBeInTheDocument()
  });
});