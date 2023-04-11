import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import { ConfigProvider } from "antd";
import Game from "../pages/Game/Game";
import Home from "../pages/Home/Home";
import Lobby from "../pages/Lobby/Lobby";
import Rules from "../pages/Rules/Rules";
import CreateLobby from "../pages/Lobby/CreateLobby";
import WaitingLobby from "../pages/Lobby/WaitingLobby";


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