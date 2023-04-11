import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import Game from '../src/components/Game/Game';
import { act } from 'react-dom/test-utils';

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

describe('Game', () => {
    it('renders without errors', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <Game />
            </BrowserRouter>
        )
        expect(getByText("Scores")).toBeInTheDocument()
        expect(getByText("Back")).toBeInTheDocument()
    })

    it('open modal on button click', async () => {
        const { getByText, } = render(
            <BrowserRouter>
                <Game />
            </BrowserRouter>
        )
        const button = getByText("Back")
        fireEvent.click(button)
        expect(getByText("Are you sure to leave the lobby?")).toBeInTheDocument();
        const leave = getByText(/OK/)
        fireEvent.click(leave)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })

    it('open close modal on button click', async () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <Game />
            </BrowserRouter>
        )
        const button = getByText("Back")

        fireEvent.click(button)
        const leave = getByText(/Cancel/)
        await act(async () => {
            fireEvent.click(leave)
        });
        expect(queryByText("Are you sure to leave the lobby")).not.toBeInTheDocument();
    })

    it('open scores on hover/click button score', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <Game />
            </BrowserRouter>
        )
        const scores = getByText("Scores")
        fireEvent.mouseOver(scores)
        expect(getByText("1")).toBeInTheDocument()
    })
})