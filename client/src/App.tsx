import React, { useContext } from 'react';
import socketContext from './context/SocketContext';

export interface AppProps { }

const App: React.FunctionComponent<AppProps> = (props) => {
  const { socket, uid, users } = useContext(socketContext).socketState;

  return (
    <div>
      <h2>Socket IO Information:</h2>
      <p>
        Your user ID: <strong>{uid}</strong>
        <br />
        Users online: <strong>{users.length}</strong>
        <br />
        Socket ID: <strong>{socket?.id}</strong>
        <br />
      </p>
    </div>
  );
};

export default App;