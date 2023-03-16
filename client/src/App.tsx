import React, { useContext } from 'react';
import socketContext from './context/SocketContext';
import { Button } from 'antd';

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
        <Button onClick={() => socket?.emit("join_room", "room_id")}>Connect 1</Button>
        <Button onClick={() => socket?.emit("join_room", "room_id1")}>Connect 2</Button>
        <Button onClick={() => socket?.emit("create_room", "room_id")}>Create 1</Button>
        <Button onClick={() => socket?.emit("create_room", "room_id1")}>Create 2</Button>
      </p>
    </div>
  );
};

export default App;