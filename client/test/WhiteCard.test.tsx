import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';
import WhiteCard from '../src/components/Cards/WhiteCard';


describe('BlackCard', () => {
  it('renders card correctly', () => {
    const { getByText } = render(
      <WhiteCard />
    );
    expect(getByText("Cards Against Humanity")).toBeInTheDocument()
  });
});