import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useContext, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { drawBlackCard, nextCzar, onConfirm, sendBlack, setCurrentSolution } from "../../hooks/functions"
import socketContext from "../../context/SocketContext"
import { useNavigate } from "react-router-dom"

const CzarView = ({ ...props }) => {
    const { socket, white_card, score, rooms } = useContext(socketContext).socketState;
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")
    const [selectedUser, setSelectedUser] = useState("")
    const [blackCard, setBlackCard] = useState("")
    const black = useAppSelector(state => state.blackCards.cards)
    const { roomName } = props
    const [hasPicked, setHasPicked] = useState(false)
    const navigate = useNavigate()
    const roomPlayers = rooms[roomName]

    useEffect(() => {
        const card = drawBlackCard(black)?.title
        setBlackCard(card)
        setTimeout(() => {
            sendBlack(socket, card, roomName)
        }, 500);
    }, [])

    useEffect(() => {
        if (white_card.size === roomPlayers?.length - 1) {
            onConfirm(socket, roomName, score, selectedUser, true)
            setHasPicked(true)
        }
        if (white_card.size === 0 && hasPicked) {
            nextCzar(socket, roomName, navigate, selectedUser)
            setHasPicked(false)
        }
    }, [white_card.size])

    return (
        <>
            <Row justify="center" style={{ margin: 12 }}>
                <BlackCard title={blackCard} cardStyle={{ width: 240, height: 240 }} />
            </Row>
            <Row justify="center" gutter={[32, 32]}>
                {Array.from(white_card).map(([userId, card], index) =>
                    <Col key={index} onClick={() => setCurrentSolution(card, selected, userId, setSelected, setSolution, setSelectedUser)}>
                        <WhiteCard
                            hoverable
                            selected={selected === card}
                            cardStyle={{ width: 180, height: 200 }}
                            title={card} />
                    </Col>
                )}
            </Row>
            <Row justify="center" align="middle" style={{ marginTop: 32 }}>
                <Button type="primary"
                    onClick={() => onConfirm(socket, roomName, score, selectedUser, false)}
                    disabled={!hasPicked || selected === ""}
                >
                    Confirm
                </Button>
            </Row>
        </>

    )
}
export default CzarView