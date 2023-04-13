import { CalculatorOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Dropdown, List, Modal, Result, Row } from "antd"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GameScorer from "./GameScorer"
import CzarView from "./CzarView"
import PlayerView from "./PlayerView"
import socketContext from "../../context/SocketContext"
import { checkScore, leaveRoom, resetScore } from "../../hooks/functions"
import BlackCard from "../../components/Cards/BlackCard"

const Game = ({ ...props }) => {
    const { socket, rooms, score } = useContext(socketContext).socketState;
    const { state } = useLocation();
    const [modal, showModal] = useState(false)
    const [lobbyType, setLobbyType] = useState<string>(state?.isCzar)
    const [show, setShow] = useState<any>(false)
    const players = rooms[state?.roomName]
    let playersForScore: Array<User> = Array.from(score, ([name, score]) => ({ name, score }));
    const navigate = useNavigate()

    const items = [
        {
            label: <GameScorer />,
            key: '1',
        },
    ];

    useEffect(() => {
        setLobbyType(state?.isCzar)
    }, [state])

    useEffect(() => {
        setShow(checkScore(playersForScore)?.status)
    }, [score])


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
                        onOk={() => leaveRoom(socket, state?.roomName, true, navigate)}
                        onCancel={() => showModal(false)}
                    />
                    <Modal
                        width={1000}
                        open={show}
                        children={
                            <Row justify="center" align="middle">
                                <BlackCard
                                    frontStyle={{ margin: 0 }}
                                    title={`The player ${checkScore(playersForScore)?.res[0]?.name} Won the game`}
                                    children={<List
                                        size="small"
                                        itemLayout="horizontal"
                                        dataSource={playersForScore.sort((a, b) => b.score - a.score)}
                                        renderItem={(user) => (
                                            <List.Item >
                                                <p style={{ color: "white", fontSize: 12 }}>{user.name} : {user.score}</p>
                                            </List.Item>
                                        )}

                                    />}
                                />
                            </Row>
                        }
                        footer={[
                            <Row style={{ marginTop: 22 }} justify="center">
                                <Button size="large" type="primary" onClick={() => {
                                    leaveRoom(socket, state?.roomName, true, navigate)
                                }}
                                >
                                    Go back to Homepage
                                </Button>
                            </Row>
                        ]}
                    />
                </div >
            }
        </>
    )
}
export default Game