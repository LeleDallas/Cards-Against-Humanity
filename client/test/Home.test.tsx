import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import Home from '../src/components/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router-dom'

const mockedUsedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
    return {
        ...((await vi.importActual('react-router-dom')) as any),
        useNavigate: () => mockedUsedNavigate,
    }
})


describe('Home', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>

        );
        expect(getByText("Cards Against Humanity? More like ____________.")).toBeInTheDocument()
    });

    it('can navigate between screens', () => {
        const navigate = vi.spyOn(router, 'useNavigate')
        const { getByText } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        const join = getByText('Join room')
        const create = getByText('Create room')
        const rules = getByText('Rules')
        fireEvent.click(join)
        expect(navigate).toHaveBeenCalledTimes(1)
        fireEvent.click(create)
        expect(navigate).toHaveBeenCalledTimes(1)
        fireEvent.click(rules)
        expect(navigate).toHaveBeenCalledTimes(1)
    })
});