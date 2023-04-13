import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import GameScorer from '../src/pages/Game/GameScorer';

describe('Game Scorer', () => {


    it('renders without errors', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <GameScorer />
            </BrowserRouter>
        )
        expect(getByText("No data")).toBeInTheDocument()
    })
})