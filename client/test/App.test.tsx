import '@testing-library/jest-dom';
import { expect, it, describe, assert } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react';
import App from '../src/App';
import { SocketContextProvider, defaultSocketContextState } from '../src/context/SocketContext';
import { BrowserRouter } from 'react-router-dom';


describe('App', () => {
  it('renders socket information correctly', async (t) => {
    const socketState = {
      socketState: defaultSocketContextState,
      socketDispatch: () => { }
    };

    const { getByText } = render(
      <BrowserRouter>
        <SocketContextProvider value={socketState}>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    );
    expect(getByText(/Socket IO Information:/)).toBeInTheDocument()
  });
});