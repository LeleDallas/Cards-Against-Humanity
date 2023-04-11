import { Button, Row } from "antd"
import { useContext, useEffect } from "react"
import socketContext from "../../context/SocketContext"
import { useNavigate } from "react-router-dom"
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteLobbyCard from "../../components/Cards/WhiteLobbyCard"

const Lobby = () => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()

    const reloadPage = () => {
        socket?.emit("get_rooms", (res: any) => console.log(res));
    }

    useEffect(() => {
        reloadPage()
    }, []);

    return (
        <div style={{ margin: 20 }}>
            <Row justify="space-between" align="middle">
                <Button icon={<LeftOutlined />} type="primary" onClick={() => navigate(-1)}>Back</Button>
                <Button icon={<ReloadOutlined />} type="primary" onClick={() => reloadPage()}>Refresh</Button>
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                <BlackCard cardStyle={{ height: "12.75em", whiteSpace: "pre-line" }} title={`Choose a room ____________. \n\nUsers Online: ${users.length}`} />
            </Row>
            <Row justify="space-around" style={{ marginTop: 22 }} gutter={[32, 32]}>
                {Object.keys(rooms).map((roomName, index) =>
                    <WhiteLobbyCard join roomName={roomName} players={rooms[roomName]} key={index} />
                )}
            </Row>
        </div >
    )
}
export default Lobby