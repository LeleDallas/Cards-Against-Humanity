import { Button, Col, Row } from "antd"
import BlackCard from "../Cards/BlackCard"
import WhiteCard from "../Cards/WhiteCard"
import { useState } from "react"

let rawResponse = [
    { isBlack: false, title: "dasds \nassad" },
    { isBlack: false, title: "sSA" },
    { isBlack: false, title: "aSas" },
]
let rawBlackData = { isBlack: true, title: "BLACK CARD" }


const CzarView = ({ ...props }) => {
    const [solution, setSolution] = useState(false)
    const [selected, setSelected] = useState("")

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