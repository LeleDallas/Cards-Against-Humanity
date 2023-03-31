import React from 'react';
import '@testing-library/jest-dom';
import { expect, it, describe, assert, afterEach, vitest } from 'vitest'
import { cleanup, render } from '@testing-library/react';
import { SocketContextProvider, defaultSocketContextState } from '../src/context/SocketContext';
import SocketContextComponent from '../src/context/SocketContextComponent';

describe('SocketContextComponent', async () => {
    const socketState = {
        socketState: defaultSocketContextState,
        socketDispatch: () => { }
    };
    const { getByText } = render(
        <SocketContextProvider value={socketState}>
            <SocketContextComponent />
        </SocketContextProvider>
    );

    afterEach(() => {
        cleanup();
        vitest.resetAllMocks();
    });

    it('renders loading message when loading is true', async () => {
        expect(getByText(/Loading/)).toBeInTheDocument()
    });

});