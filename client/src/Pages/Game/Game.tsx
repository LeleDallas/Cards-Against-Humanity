import { CalculatorOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Dropdown, Modal, Row } from "antd"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import GameScorer from "./GameScorer"
import CzarView from "./CzarView"
import PlayerView from "./PlayerView"
import socketContext from "../../context/SocketContext"
import { SocketRoomResponse } from "../../types/socketResponse"

const Game = ({ ...props }) => {
    const { socket, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
    const [modal, showModal] = useState(false)
    const [lobbyType, setLobbyType] = useState<string>(state?.isCzar)
    const players = rooms[state?.roomName].map((name: string) => ({
        name,
        id: name,
        points: 0
    }))

    const items = [
        {
            label: <GameScorer players={players} />,
            key: '1',
        },
    ];

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between" style={{ marginBottom: 22 }}>
                <Button type="primary" onClick={() => showModal(true)} icon={<LeftOutlined />}> Back</Button>
                <Dropdown menu={{ items }} placement="bottomLeft">
                    <Button icon={<CalculatorOutlined />} type="primary">Scores</Button>
                </Dropdown>
            </Row>
            {lobbyType === "czar" ? <CzarView roomName={state?.roomName} /> : <PlayerView />}
            <Modal open={modal} title="Are you sure to leave the lobby?"
                onOk={() =>
                    socket?.emit("leave_room", state?.roomName, (response: SocketRoomResponse) => {
                        response?.success &&
                            navigate("/lobby")
                    })}
                onCancel={() => showModal(false)}
            />
        </div >
    )
}
export default Game