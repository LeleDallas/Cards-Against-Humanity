import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import GameScorer from '../src/components/Game/GameScorer';

describe('Game Scorer', () => {


    it('renders without errors', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <GameScorer />
            </BrowserRouter>
        )
        expect(getByText("4")).toBeInTheDocument()
    })
})