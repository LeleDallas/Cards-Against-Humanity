import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useContext, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { Cards } from "../../types/cards"
import { drawWhiteCards } from "../../hooks/functions"
import socketContext from "../../context/SocketContext"

const PlayerView = ({ ...props }) => {
    const { socket, uid, users, rooms, black_card } = useContext(socketContext).socketState;
    const [selected, setSelected] = useState<string>("")
    const [playerHand, setPlayerHand] = useState<Array<Cards>>([])
    const white = useAppSelector(state => state?.whiteCards?.cards)

    const useSelect = (cardTitle: string) => cardTitle === selected ? setSelected("") : setSelected(cardTitle)

    useEffect(() => {
        setPlayerHand([])
        setPlayerHand((oldHand: Array<Cards>) => [...oldHand, ...drawWhiteCards(white, 10)]);
    }, [])

    const drawNew = () => {
        setPlayerHand(playerHand.filter((card, _) => card.title !== selected))
        setPlayerHand((oldHand: Array<Cards>) => [...oldHand, ...drawWhiteCards(white, 1)]);
        setSelected("")
    }
    console.log(black_card)
    return (
        <>
            <Row justify="center" style={{ marginTop: 12 }}>
                <BlackCard
                    cardStyle={{ width: 240, height: 240 }}
                    title={black_card}
                />
            </Row>
            <Row justify="center" align="middle" gutter={[32, 32]} style={{ marginTop: 12 }}>
                {playerHand.map((card, index) =>
                    <Col key={index} onClick={() => useSelect(card.title)}>
                        <WhiteCard
                            hoverable
                            selected={selected === card.title}
                            cardStyle={{ width: 180, height: 200 }}
                            title={card.title}
                            frontStyle={{ fontSize: "15px" }}
                        />
                    </Col>
                )}
                <Button disabled={selected === ""} type="primary" onClick={() => drawNew()}>Submit Response</Button>
            </Row >
        </>

    )
}
export default PlayerView