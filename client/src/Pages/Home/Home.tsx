import { Button, Row } from "antd"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cowboyBoot from '../../assets/cowboyboot.png';
import fartAndWalkaway from '../../assets/fartandwalkaway.png';
import airplane from '../../assets/paperairplane.png';
import pizza from '../../assets/pizza.png';
import { useEffect } from "react";
import WhiteCard from "../../components/Cards/WhiteCard";
import BlackCard from "../../components/Cards/BlackCard";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../reducers";
import { useAppSelector } from "../../hooks/hooks";
import { faker } from '@faker-js/faker';
import { fetchCards } from "../../hooks/functions";
import { berryImg, blackContainerLeft, blackContainerTop, blackContainerTransform, buttonRulesWidth, defaultImgDistance, jazzImg, rightRule, whiteContainer } from "../../hooks/style.utils";


const ContainerWhite = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: 40%;
left: ${whiteContainer};
`

const ContainerBlack = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: ${blackContainerTop};
left: ${blackContainerLeft};
perspective: 50em;
${blackContainerTransform};
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
                <Button style={{ width: buttonRulesWidth, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/lobby")}>Join room</Button>
                <Button style={{ width: buttonRulesWidth, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/create")}>Create room</Button>
                <Button style={{ width: buttonRulesWidth, height: 50, fontSize: 18 }} size="large" onClick={() => navigate("/rules")}>Rules</Button>
            </Row>
            <img style={{ width: defaultImgDistance, position: "absolute", top: 40, left: 20 }} src={pizza} alt="pizza" />
            {berryImg}
            <img style={{ width: defaultImgDistance, position: "absolute", bottom: 40, left: 20 }} src={fartAndWalkaway} alt="fartAndWalkaway" />
            <img style={{ width: defaultImgDistance, position: "absolute", top: 40, right: 20 }} src={airplane} alt="airplane" />
            {jazzImg}
            <img style={{ width: defaultImgDistance, position: "absolute", bottom: 40, right: rightRule }} src={cowboyBoot} alt="cowboyBoot" />
        </div >
    )
}
export default Home