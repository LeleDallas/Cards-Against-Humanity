import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Lobby from '../src/pages/Lobby/Lobby';
import { BrowserRouter } from 'react-router-dom';

describe('Lobby component', () => {
    let lobbyRenderResult;
    beforeEach(() => {
        lobbyRenderResult = render(
            <BrowserRouter>
                <Lobby />
            </BrowserRouter>
        )
    });

    it('renders without errors', async () => {
        const { getByText } = await waitFor(() => lobbyRenderResult);
        expect(getByText(/Users Online:/)).toBeInTheDocument()
    })
})