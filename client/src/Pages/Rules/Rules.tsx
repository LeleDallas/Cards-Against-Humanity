import { Button, Col, Row, Typography } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { isMobile } from "react-device-detect"
import BlackCard from "../../components/Cards/BlackCard"
import WhiteCard from "../../components/Cards/WhiteCard"


const Rules = () => {
    const navigate = useNavigate()

    return (
        <div style={{ margin: 30 }}>
            <Button icon={<LeftOutlined />} type="primary" onClick={() => navigate(-1)}>Back</Button>
            <Row justify="center" style={{ margin: "22px 0" }}>
                <Typography.Title level={2}>
                    Cards Against Humanity: [Fill in the Blank] Edition
                </Typography.Title>
            </Row>
            <Row style={{ width: "auto" }} align="middle" justify="center" gutter={isMobile ? [64, 32] : [32, 0]}>
                <Col>
                    <BlackCard title="All I want for Christmas is" />
                </Col>
                <Col>
                    <WhiteCard title="Best grade for my exam of" />
                </Col>
                <Col>
                    <WhiteCard title="Cards Against Humanity" />
                </Col>
            </Row>
            <p style={{ margin: "22px 0" }}>
                Cards Against Humanity: [fill in the blank] Edition is a fill-in-the-blank party game. Each
                round, one player asks the group a question from a black card. These cards consist of inside jokes, memories, and more.

                The player who most recently [action] begins as the
                Card Czar and draws a black card.

                The Card Czar reads the black card out loud. Everyone else then answers the
                question (or fills in the blank) by passing one white card, face down, to the Card Czar.

                The Card Czar then shuffles all the white cards and re-reads the black card out loud
                with each one. Finally, the Card Czar picks the funniest combination, and whoever
                played it gets one point/the black card.
            </p>
            <Row align="middle" justify="center" gutter={[32, 32]} >
                <Col>
                    <Button type="primary" style={{ width: isMobile ? 250 : 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/lobby")}>Join room</Button>
                </Col>
                <Col>
                    <Button type="primary" style={{ width: isMobile ? 250 : 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/create")}>Create room</Button>
                </Col>
            </Row>
        </div >
    )
}
export default Rules