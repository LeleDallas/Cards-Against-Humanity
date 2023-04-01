import { Button, Row } from "antd"
import { useNavigate } from "react-router-dom";
import WhiteCard from "../Cards/WhiteCard";
import BlackCard from "../Cards/BlackCard";
import styled from "styled-components";
import cowboyBoot from '../../assets/cowboyboot.png';
import fartAndWalkaway from '../../assets/fartandwalkaway.png';
import jazzHands from '../../assets/jazzhands.png';
import berry from '../../assets/miracleberry.png';
import airplane from '../../assets/paperairplane.png';
import pizza from '../../assets/pizza.png';

const ContainerWhite = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: 40%;
left: 50%;
`
const ContainerBlack = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: 50%;
left: 53%;
perspective: 50em;
rotate: 22deg
`

const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ContainerWhite>
                <WhiteCard />
            </ContainerWhite>
            <ContainerBlack style={{ rotate: "22deg" }}>
                <BlackCard />
            </ContainerBlack>
            <Row style={{ position: "absolute", bottom: "18%", width: "50%", textAlign: "center", left: "25%" }} justify="space-between">
                <Button style={{ width: 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/lobby")}>Join room</Button>
                <Button style={{ width: 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/create")}>Create room</Button>
                <Button style={{ width: 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/rules")}>Rules</Button>
            </Row>

            <img style={{ width: "12em", position: "absolute", top: 40, left: 20 }} src={pizza} alt="pizza" />
            <img style={{ width: "9em", position: "absolute", top: "30%", left: 20 }} src={berry} alt="berry" />
            <img style={{ width: "12em", position: "absolute", bottom: 40, left: 20 }} src={fartAndWalkaway} alt="fartAndWalkaway" />
            <img style={{ width: "12em", position: "absolute", top: 40, right: 20 }} src={airplane} alt="airplane" />
            <img style={{ width: "12em", position: "absolute", top: "40%", right: 20 }} src={jazzHands} alt="jazzHands" />
            <img style={{ width: "12em", position: "absolute", bottom: 40, right: 20 }} src={cowboyBoot} alt="cowboyBoot" />

        </div >
    )
}
export default Home