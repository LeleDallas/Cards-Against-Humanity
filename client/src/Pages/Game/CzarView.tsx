import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useContext, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { drawBlackCard, setCurrentSolution } from "../../hooks/functions"
import socketContext from "../../context/SocketContext"
import { SocketGameStartResponse } from "../../types/socketResponse"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter"

let rawResponse = [
    { isBlack: false, title: "test1" },
    { isBlack: false, title: "test2" },
    { isBlack: false, title: "test3" },
]

const CzarView = ({ ...props }) => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")
    const [blackCard, setBlackCard] = useState("")
    const black = useAppSelector(state => state.blackCards.cards)
    const {roomName} = props

    const sendBlack = (socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined, card: string) => {
        socket?.emit("send_black_card", card, roomName, (response: SocketGameStartResponse) => {
        })
    }  

    useEffect(() => {
        const card = drawBlackCard(black).title
        setBlackCard(card)
        sendBlack(socket, card)
    }, [])

    const onConfirm = () => {
        //TO DO
        //Notify all
    }

    return (
        <>
            <Row justify="center" style={{ margin: 12 }}>
                <BlackCard title={blackCard} cardStyle={{ width: 240, height: 240 }} />
            </Row>
            <Row justify="center" gutter={[32, 32]}>
                {rawResponse.map((card, index) =>
                    <Col key={index} onClick={() => setCurrentSolution(card.title, selected, setSelected, setSolution)}>
                        <WhiteCard
                            hoverable
                            selected={selected === card.title}
                            cardStyle={{ width: 180, height: 200 }}
                            title={card.title} />
                    </Col>
                )}
            </Row>
            <Row justify="center" align="middle" style={{ marginTop: 32 }}>
                <Button type="primary" onClick={onConfirm} disabled={!solution}>
                    Confirm
                </Button>
            </Row>
        </>

    )
}
export default CzarView