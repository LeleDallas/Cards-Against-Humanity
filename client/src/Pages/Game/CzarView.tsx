import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useState } from "react"
import cards from "../../../../server/db/models/cards"

let rawResponse = [
    { isBlack: false, title: "dasds \nassad" },
    { isBlack: false, title: "sSA" },
    { isBlack: false, title: "aSas" },
]
let rawBlackData = { isBlack: true, title: "BLACK CARD" }


const CzarView = ({ ...props }) => {
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")
    const [black, setBlacks] = useState([]); // to be changed with redux

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

    let drawBlackCard = function() {
        const index:number = Math.floor(Math.random() * black.length);
        const draw:cards = black[index];
        setBlacks(black.filter((_, card) => card !== index))
        return draw;
    }

    return (
        <>
            <Row justify="center" style={{ margin: 12 }}>
                <BlackCard title={rawBlackData.title} cardStyle={{ width: 240, height: 240 }} />
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