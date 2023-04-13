import { CalculatorOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Dropdown, Modal, Result, Row } from "antd"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GameScorer from "./GameScorer"
import CzarView from "./CzarView"
import PlayerView from "./PlayerView"
import socketContext from "../../context/SocketContext"
import { leaveRoom } from "../../hooks/functions"

const Game = ({ ...props }) => {
    const { socket, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
    const [modal, showModal] = useState(false)
    const [lobbyType, setLobbyType] = useState<string>(state?.isCzar)
    const players = rooms[state?.roomName]
    const items = [
        {
            label: <GameScorer />,
            key: '1',
        },
    ];

    return (
        <>
            {players === undefined || players.length < 3 ?
                <Result
                    status="warning"
                    title="This room do not exist anymore."
                    extra={
                        <Button type="primary" key="console" onClick={() => navigate("/")}>
                            Go to the homepage
                        </Button>
                    }
                /> :
                <div style={{ margin: 30 }}>

                    <Row justify="space-between" style={{ marginBottom: 22 }}>
                        <Button type="primary" onClick={() => showModal(true)} icon={<LeftOutlined />}> Back</Button>
                        <Dropdown menu={{ items }} placement="bottomLeft">
                            <Button icon={<CalculatorOutlined />} type="primary">Scores</Button>
                        </Dropdown>
                    </Row>
                    {lobbyType === "czar" ? <CzarView roomName={state?.roomName} /> : <PlayerView />}
                    <Modal open={modal} title="Are you sure to leave the lobby?"
                        onOk={() => leaveRoom(socket, state?.roomName, navigate)}
                        onCancel={() => showModal(false)}
                    />
                </div >
            }
        </>
    )
}
export default Game