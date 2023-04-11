import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { drawBlackCard, setCurrentSolution } from "../../hooks/functions"

let rawResponse = [
    { isBlack: false, title: "test1" },
    { isBlack: false, title: "test2" },
    { isBlack: false, title: "test3" },
]

const CzarView = ({ ...props }) => {
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")
    const [blackCard, setBlackCard] = useState("")
    const black = useAppSelector(state => state.blackCards.cards)

    useEffect(() => {
        setBlackCard(drawBlackCard(black)?.title)
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