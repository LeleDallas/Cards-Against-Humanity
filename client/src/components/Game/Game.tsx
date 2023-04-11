import { CalculatorOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Dropdown, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import PlayerView from "./PlayerView"
import CzarView from "./CzarView"
import GameScorer from "./GameScorer"
import cards from "../../../../server/db/models/cards"

const Loader = styled.div`
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
`

const items = [
    {
        label: <GameScorer />,
        key: '1',
    },
];
const Game = ({ ...props }) => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [modal, showModal] = useState(false)
    const [lobbyType, setLobbyType] = useState<string>(state)
    const [black, setBlacks] = useState([]);
    const [white, setWhites] = useState([]);

    useEffect(() => {
        if (white.length == 0) {
            fetch('http://localhost:3001/cards/', { mode: 'cors' })
                .then((res) => res.json())
                .then((data) => {
                    setBlacks(data.filter((card: cards) => card.isBlack == true));
                    setWhites(data.filter((card: cards) => card.isBlack == false));
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [white.length > 0 && black.length > 0]);

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between" style={{ marginBottom: 22 }}>
                <Button type="primary" onClick={() => showModal(true)} icon={<LeftOutlined />}> Back</Button>
                <Dropdown menu={{ items }} placement="bottomLeft">
                    <Button icon={<CalculatorOutlined />} type="primary">Scores</Button>
                </Dropdown>
            </Row>
            {lobbyType === "czar" ? <CzarView /> : <PlayerView />}
            <Modal open={modal} title="Are you sure to leave the lobby?"
                onOk={() => navigate(-1)}
                onCancel={() => showModal(false)}
            />
            {/* <Spin tip="Loading" size="large">
                <Loader />
            </Spin> */}
        </div >
    )
}
export default Game