import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import { ConfigProvider } from "antd";
import Home from "../pages/Home/Home";
import Lobby from "../pages/Lobby/Lobby";
import Rules from "../pages/Rules/Rules";
import CreateLobby from "../pages/Lobby/CreateLobby";
import WaitingLobby from "../pages/Lobby/WaitingLobby";
import Game from "../pages/Game/Game";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ErrorRoute from "./ErrorRoute";


const AppRoute = (props: any) =>
    <Provider store={store}>
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
                    <Route path="*" element={<ErrorRoute />} />
                </Routes>
            </SocketContextComponent>
        </ConfigProvider>
    </Provider>

export default AppRoute