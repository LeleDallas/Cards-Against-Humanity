<<<<<<< client/src/components/Lobby/WaitingLobby.tsx
import { Button, Popconfirm, Row } from "antd"
import { useContext, useEffect, useState } from "react"
=======
import { Button, Popconfirm, Row, message } from "antd"
import { useContext } from "react"
>>>>>>> client/src/components/Lobby/WaitingLobby.tsx
import socketContext from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import WhiteLobbyCard from "../Cards/WhiteLobbyCard"
import { SocketGameStartResponse, SocketRoomResponse } from "../../types/socketResponse"
import { isMobile } from "react-device-detect"

const WaitingLobby = ({ ...props }) => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
<<<<<<< client/src/components/Lobby/WaitingLobby.tsx
=======
    const startGame = () => {
        socket?.emit("request_start_game", state?.lobbyName, (response: SocketGameStartResponse) => {
            if (response?.success) {
                message.success("Game is starting!")
                navigate("/game", { state: response.isCzar })
            }
            else
                message.error("This room has not reach the minimum people to start a game!")
        })
    }
>>>>>>> client/src/components/Lobby/WaitingLobby.tsx

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
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {
<<<<<<< client/src/components/Lobby/WaitingLobby.tsx
                        socket?.emit("leave_room", state?.lobbyName, (response: any) => {
                            if (response.success) {
                                navigate(-1)
                            }
=======
                        socket?.emit("leave_room", state?.lobbyName, (response: SocketRoomResponse) => {
                            response?.success &&
                                navigate(-1)
>>>>>>> client/src/components/Lobby/WaitingLobby.tsx
                        })
                    }}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: isMobile ? 22 : 0 }}>
                <WhiteLobbyCard lobbyName={state?.lobbyName} players={rooms[state?.lobbyName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
<<<<<<< client/src/components/Lobby/WaitingLobby.tsx
                {state?.type === "admin" && <Button style={{ width: 200 }} type="primary" size="large">Start Game</Button>}
=======
                {rooms[state?.lobbyName] && state?.type === "admin" && <Button onClick={() => startGame()} style={{ width: 200 }} type="primary" size="large">Start Game</Button>}
>>>>>>> client/src/components/Lobby/WaitingLobby.tsx
            </Row>
        </div >
    )
}
export default WaitingLobby