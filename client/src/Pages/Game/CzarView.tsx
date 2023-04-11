import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { Cards } from "../../types/cards"
import { drawBlackCard } from "../../hooks/functions"

let rawResponse = [
    { isBlack: false, title: "dasds \nassad" },
    { isBlack: false, title: "sSA" },
    { isBlack: false, title: "aSas" },
]

const CzarView = ({ ...props }) => {
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")
    const black = useAppSelector(state => state.blackCards.cards)

    const setCurrentSolution = (solution: string) => {
        if (solution !== selected) {
            setSelected(solution)
            setSolution(true)
        }
        else {
            setSelected("")
            setSolution(false)
        }
    }

    const onConfirm = () => {
        //TO DO
        //Notify all
    }


    return (
        <>
            <Row justify="center" style={{ margin: 12 }}>
                <BlackCard title={drawBlackCard(black).title} cardStyle={{ width: 240, height: 240 }} />
            </Row>
            <Row justify="center" gutter={[32, 32]}>
                {rawResponse.map((card, index) =>
                    !card.isBlack &&
                    <Col key={index} onClick={() => setCurrentSolution(card.title)}>
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