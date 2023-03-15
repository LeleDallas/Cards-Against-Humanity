import React from 'react';
import { expect, it, describe, assert } from 'vitest'
import { render } from '@testing-library/react';
import { SocketContextProvider, defaultSocketContextState } from '../src/context/SocketContext';
import SocketContextComponent from '../src/context/SocketContextComponent';


describe('SocketContextComponent', () => {
    const socketState = {
        socketState: defaultSocketContextState,
        socketDispatch: () => { }
    };
    const { getByText } = render(
        <SocketContextProvider value={socketState}>
            <SocketContextComponent />
        </SocketContextProvider>
    );
    it('renders loading message when loading is true', async () => {
        expect(getByText("... loading Socket IO ....").textContent).toBe("... loading Socket IO ....")
    });
});