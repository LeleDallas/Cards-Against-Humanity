import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import Home from "../components/Home/Home";
import App from "../App";
import WaitingLobby from "../components/Lobby/WaitingLobby";

const AppRoute = (props:any) => {
    return <SocketContextComponent>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<App />} />
            <Route path="/waiting" element={<WaitingLobby {...props} />} />
        </Routes>
    </SocketContextComponent>
}
export default AppRoute