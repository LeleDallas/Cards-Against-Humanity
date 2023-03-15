import { expect, it, describe, assert } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react';
import App from '../src/App';
import { SocketContextProvider, defaultSocketContextState } from '../src/context/SocketContext';

describe('App', () => {
  it('renders socket information correctly', async (t) => {
    const socketState = {
      socketState: defaultSocketContextState,
      socketDispatch: () => { }
    };

    const { getByText } = render(
      <SocketContextProvider value={socketState}>
        <App />
      </SocketContextProvider>
    );
    expect(getByText("Socket IO Information:").textContent).toBe("Socket IO Information:")
  });
});
