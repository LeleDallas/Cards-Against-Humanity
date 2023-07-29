import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import { ConfigProvider } from "antd";
import Home from "../Pages/Home/Home";
import Lobby from "../Pages/Lobby/Lobby";
import Rules from "../Pages/Rules/Rules";
import CreateLobby from "../Pages/Lobby/CreateLobby";
import WaitingLobby from "../Pages/Lobby/WaitingLobby";
import Game from "../Pages/Game/Game";
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