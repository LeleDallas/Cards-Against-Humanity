import { Button, Row } from "antd"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cowboyBoot from '../../assets/cowboyboot.png';
import fartAndWalkaway from '../../assets/fartandwalkaway.png';
import jazzHands from '../../assets/jazzhands.png';
import berry from '../../assets/miracleberry.png';
import airplane from '../../assets/paperairplane.png';
import pizza from '../../assets/pizza.png';
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import WhiteCard from "../../components/Cards/WhiteCard";
import BlackCard from "../../components/Cards/BlackCard";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../reducers";
import { useAppSelector } from "../../hooks/hooks";
import { faker } from '@faker-js/faker';
import { fetchCards } from "../../hooks/functions";


const ContainerWhite = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: 40%;
left: ${isMobile ? "40%" : "50%"};
`

const ContainerBlack = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: ${isMobile ? "30%" : "50%"};
left: ${isMobile ? "34%" : "53%"};
perspective: 50em;
${isMobile && 'transform: rotate(18deg)'};
rotate: 22deg;
`

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const white = useAppSelector(state => state.whiteCards.cards)
    const black = useAppSelector(state => state.blackCards.cards)

    useEffect(() => {
        dispatch(updateUserName(faker.name.fullName()))
        if (white.length === 0 || black.length === 0)
            fetchCards(dispatch)
    }, []);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ContainerWhite>
                <WhiteCard />
            </ContainerWhite>
            <ContainerBlack style={{ rotate: "22deg" }}>
                <BlackCard />
            </ContainerBlack>
            <Row align="middle"
                gutter={[0, 16]}
                style={{ position: "absolute", bottom: "18%", width: "50%", textAlign: "center", left: 0, right: 0, margin: "auto" }}
                justify="space-between"
            >
                <Button style={{ width: isMobile ? 250 : 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/lobby")}>Join room</Button>
                <Button style={{ width: isMobile ? 250 : 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/create")}>Create room</Button>
                <Button style={{ width: isMobile ? 250 : 150, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/rules")}>Rules</Button>
            </Row>
            <img style={{ width: isMobile ? "8em" : "12em", position: "absolute", top: 40, left: 20 }} src={pizza} alt="pizza" />
            {!isMobile && <img style={{ width: "9em", position: "absolute", top: "30%", left: 20 }} src={berry} alt="berry" />}
            <img style={{ width: isMobile ? "8em" : "12em", position: "absolute", bottom: 40, left: 20 }} src={fartAndWalkaway} alt="fartAndWalkaway" />
            <img style={{ width: isMobile ? "8em" : "12em", position: "absolute", top: 40, right: 20 }} src={airplane} alt="airplane" />
            {!isMobile && <img style={{ width: "12em", position: "absolute", top: "40%", right: 20 }} src={jazzHands} alt="jazzHands" />}
            <img style={{ width: isMobile ? "8em" : "12em", position: "absolute", bottom: 40, right: isMobile ? 16 : 20 }} src={cowboyBoot} alt="cowboyBoot" />
        </div >
    )
}
export default Home