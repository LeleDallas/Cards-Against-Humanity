import { Button, Col, Row, Spin } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useContext, useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { Cards } from "../../types/cards"
import { drawWhiteCards, sendWhiteResponse } from "../../hooks/functions"
import socketContext from "../../context/SocketContext"
import { LoadingOutlined } from "@ant-design/icons"

const PlayerView = () => {
    const { socket, black_card, czarSocketId } = useContext(socketContext).socketState;
    const [selected, setSelected] = useState<string>("")
    const [playerHand, setPlayerHand] = useState<Array<Cards>>([])
    const white = useAppSelector(state => state?.whiteCards?.cards)
    const spin = <LoadingOutlined style={{ fontSize: 100 }} spin />;

    const useSelect = (cardTitle: string) => cardTitle === selected ? setSelected("") : setSelected(cardTitle)

    useEffect(() => {
        setPlayerHand([])
        setPlayerHand((oldHand: Array<Cards>) => [...oldHand, ...drawWhiteCards(white, 10)]);
    }, [])

    const drawNew = () => {
        sendWhiteResponse(socket!, czarSocketId, selected)
        setPlayerHand(playerHand.filter((card, _) => card.title !== selected))
        setPlayerHand((oldHand: Array<Cards>) => [...oldHand, ...drawWhiteCards(white, 1)]);
        setSelected("")
    }

    return (
        <>
            <Row justify="center" style={{ marginTop: 12 }}>
                {black_card === "" ?
                    <BlackCard
                        cardStyle={{ width: 240, height: 240 }}
                        title=""
                        children=
                        {
                            <Row justify={"center"} align={"middle"}>
                                <Spin indicator={spin} style={{ color: "#fff" }} size="large" />
                            </Row>
                        }
                    />
                    :
                    <BlackCard
                        cardStyle={{ width: 240, height: 240 }}
                        title={black_card}
                    />
                }
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