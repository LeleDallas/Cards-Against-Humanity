import { Button, Popconfirm, Row } from "antd"
import { useContext } from "react"
import socketContext from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import { isMobile } from "react-device-detect"
import WhiteLobbyCard from "../../components/Cards/WhiteLobbyCard"
import { deleteRoom, leaveRoom, startGame } from "../../hooks/functions"

const WaitingLobby = () => {
    const { socket, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between">
                {state?.type === "admin" ?
                    <Popconfirm
                        title="Leave room alert"
                        description="Are you sure to exit and delete this room?"
                        onConfirm={() => deleteRoom(socket, state?.roomName, navigate)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<LeftOutlined />} type="primary" >Back</Button>
                    </Popconfirm> :
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {
                        leaveRoom(socket, state?.roomName, false, navigate)
                    }}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: isMobile ? 22 : 0 }}>
                <WhiteLobbyCard roomName={state?.roomName} players={rooms[state?.roomName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                {rooms[state?.roomName] && state?.type === "admin" &&
                    <Button
                        onClick={() => startGame(socket, state?.roomName, navigate)}
                        style={{ width: 200 }}
                        type="primary"
                        size="large"
                    >
                        Start Game
                    </Button>
                }
            </Row>
        </div >
    )
}
export default WaitingLobby