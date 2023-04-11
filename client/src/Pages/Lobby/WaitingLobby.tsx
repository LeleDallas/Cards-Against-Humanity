import { Button, Popconfirm, Row, message } from "antd"
import { useContext } from "react"
import socketContext from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import { SocketGameStartResponse, SocketRoomResponse } from "../../types/socketResponse"
import { isMobile } from "react-device-detect"
import WhiteLobbyCard from "../../components/Cards/WhiteLobbyCard"

const WaitingLobby = ({ ...props }) => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
    const startGame = () => {
        socket?.emit("request_start_game", state?.roomName, (response: SocketGameStartResponse) => {
            if (response?.success) {
                message.success("Game is starting!")
                navigate("/game", { state: {
                    isCzar : response.isCzar,
                    roomName : state.roomName
                } })
            }
            else
                message.error("This room has not reach the minimum people to start a game!")
        })
    }

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between">
                {state?.type === "admin" ?
                    <Popconfirm
                        title="Leave room alert"
                        description="Are you sure to exit and delete this room?"
                        onConfirm={() => {
                            socket?.emit("delete_room", state?.roomName, (response: SocketRoomResponse) => {
                                response?.success &&
                                    navigate("/")
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<LeftOutlined />} type="primary" >Back</Button>
                    </Popconfirm> :
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {
                        socket?.emit("leave_room", state?.roomName, (response: SocketRoomResponse) => {
                            response?.success &&
                                navigate(-1)
                        })
                    }}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: isMobile ? 22 : 0 }}>
                <WhiteLobbyCard roomName={state?.roomName} players={rooms[state?.roomName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                {rooms[state?.roomName] && state?.type === "admin" && <Button onClick={() => startGame()} style={{ width: 200 }} type="primary" size="large">Start Game</Button>}
            </Row>
        </div >
    )
}
export default WaitingLobby