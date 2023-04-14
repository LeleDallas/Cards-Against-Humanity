import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe, beforeEach, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Rules from '../src/pages/Rules/Rules';
import { BrowserRouter } from 'react-router-dom';
import * as reactDeviceDetect from 'react-device-detect'


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

describe('Rules component', () => {
    let rulesComponent;
    beforeEach(() => {
        rulesComponent = render(
            <BrowserRouter>
                <Rules />
            </BrowserRouter>
        )
    });

    it('renders without errors', async () => {
        const { getByText } = await waitFor(() => rulesComponent);
        expect(getByText("Cards Against Humanity")).toBeInTheDocument()
    })

    it('must fire events', async () => {
        const { getByText } = await waitFor(() => rulesComponent);
        const back = getByText("Back")
        const join = getByText("Join room")
        const create = getByText("Create room")
        expect(back).toBeInTheDocument()
        expect(join).toBeInTheDocument()
        expect(create).toBeInTheDocument()
        fireEvent.click(back)
        fireEvent.click(join)
        fireEvent.click(create)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(3)
    })

    it('not render on mobile', async () => {
        Object.defineProperty(reactDeviceDetect, 'isMobile', { get: () => true });
        Object.defineProperty(reactDeviceDetect, 'isMobile', { get: () => false });
        const { getByText } = await waitFor(() => rulesComponent);
        const back = getByText("Back")
        const join = getByText("Join room")
        const create = getByText("Create room")
        expect(back).toBeInTheDocument()
        expect(join).toBeInTheDocument()
        expect(create).toBeInTheDocument()

    })
})