import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import Home from "../components/Home/Home";
import App from "../App";
import WaitingLobby from "../components/Lobby/WaitingLobby";
import { ConfigProvider } from "antd";

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
                <Route path="/lobby" element={<App />} />
                <Route path="/waiting" element={<WaitingLobby {...props} />} />
            </Routes>
        </SocketContextComponent>
    </ConfigProvider>

export default AppRoute