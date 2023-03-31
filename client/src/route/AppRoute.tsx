import { Route, Routes } from "react-router-dom";
import SocketContextComponent from "../context/SocketContextComponent";
import Home from "../components/Home/Home";
import App from "../App";

const AppRoute = () => {
    return <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/lobby" element={<SocketContextComponent><App /></SocketContextComponent>} />
    </Routes>
}
export default AppRoute