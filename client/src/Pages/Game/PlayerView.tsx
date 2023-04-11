import { Button, Col, Row } from "antd"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"
import { useState } from "react"
import cards from "../../../../server/db/models/cards"

let rawWhiteData = [
    { isBlack: false, title: "1" },
    { isBlack: false, title: "2" },
    { isBlack: false, title: "3" },
    { isBlack: false, title: "4" },
    { isBlack: false, title: "5" },
    { isBlack: false, title: "6" },
    { isBlack: false, title: "7" },
    { isBlack: false, title: "8" },
    { isBlack: false, title: "9" },
    { isBlack: false, title: "10" },
]

const PlayerView = ({ ...props }) => {
    const [selected, setSelected] = useState<string>("")

    const useSelect = (cardTitle: string) => cardTitle === selected ? setSelected("") : setSelected(cardTitle)

    const [white, setWhites] = useState([]); // to be changed with redux

    let drawWhiteCards = function(quantity:number) {
        const draw:Array<cards> = [...white].sort(() => 0.5 - Math.random()).slice(0, quantity);
        setWhites(white.filter((_, card) => card >= quantity))
        return draw;
    }

    return (
        <>
            <Row justify="center" style={{ marginTop: 12 }}>

                <BlackCard
                    cardStyle={{ width: 240, height: 240 }}
                    title={"Black Card _____"}
                />
            </Row>
            <Row justify="center" align="middle" gutter={[32, 32]} style={{ marginTop: 12 }}>
                {rawWhiteData.map((card, index) =>
                    !card.isBlack &&
                    <Col key={index} onClick={() => useSelect(card.title)}>
                        <WhiteCard
                            hoverable
                            selected={selected === card.title}
                            cardStyle={{ width: 180, height: 200 }}
                            title={card.title}
                        />
                    </Col>
                )}
                <Button disabled={selected === ""} type="primary" onClick={() => console.log(selected)}>Submit Response</Button>
            </Row >
        </>

    )
}
export default PlayerView