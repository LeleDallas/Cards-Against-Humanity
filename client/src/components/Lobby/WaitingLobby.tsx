import { Button, Popconfirm, Row } from "antd"
import { useContext, useEffect } from "react"
import socketContext from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import WhiteLobbyCard from "../Cards/WhiteLobbyCard"
import { SocketRoomResponse } from "../../types/socketResponse"
import { isMobile } from "react-device-detect"


const WaitingLobby = ({ ...props }) => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
    console.log("ROOMS "+state?.lobbyName)

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between">
                {state?.type === "admin" ?
                    <Popconfirm
                        title="Leave room alert"
                        description="Are you sure to exit and delete this room?"
                        onConfirm={() => {
                            socket?.emit("delete_room", state?.lobbyName, (response: SocketRoomResponse) => {
                                response?.success &&
                                    navigate("/")
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<LeftOutlined />} type="primary" >Back</Button>
                    </Popconfirm> :
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {socket?.emit("leave_room",state?.lobbyName, (response: any)=> {
                        if (response.success) {
                            navigate(-1)
                        }
                    })}}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: isMobile ? 22 : 0 }}>
                <WhiteLobbyCard lobbyName={state?.lobbyName} players={rooms[state?.lobbyName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                { state?.type === "admin"  && <Button style={{ width: 200 }} type="primary" size="large">Start Game</Button>}
            </Row>
        </div >
    )
}
export default WaitingLobby