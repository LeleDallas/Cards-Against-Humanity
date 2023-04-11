import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import Home from "../components/Home/Home";
import WaitingLobby from "../components/Lobby/WaitingLobby";
import { ConfigProvider } from "antd";
import CreateLobby from "../components/Lobby/CreateLobby";
import Lobby from "../components/Lobby/Lobby";
import Rules from "../components/Rules/Rules";
import Game from "../components/Game/Game";

const AppRoute = (props: any) =>
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#000',
            },
        }}
    >
        <SocketContextComponent>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/create" element={<CreateLobby />} />
                <Route path="/waiting" element={<WaitingLobby {...props} />} />
                <Route path="/game" element={<Game {...props} />} />
            </Routes>
        </SocketContextComponent>
    </ConfigProvider>

export default AppRoute