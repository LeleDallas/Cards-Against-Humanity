import { Button, Row } from "antd"
import { useNavigate } from "react-router-dom";
import WhiteCard from "../Cards/WhiteCard";
import BlackCard from "../Cards/BlackCard";
import styled from "styled-components";


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
        <div style={{ width: "100%", height: "100%", background: "red" }}>
            <ContainerWhite>
                <WhiteCard />
            </ContainerWhite>
            <ContainerBlack style={{ rotate: "22deg" }}>
                <BlackCard />
            </ContainerBlack>
            <Row style={{ position: "absolute", bottom: "18%", width: "40%", textAlign: "center", left: "30%" }} justify="space-between">
                <Button style={{ width: 150, height: 50, fontSize:18 }} size="large" onClick={() => navigate("/lobby")}>Join room</Button>
                <Button style={{ width: 150, height: 50, fontSize:18 }} size="large" onClick={() => navigate("/create")}>Create room</Button>
                <Button style={{ width: 150, height: 50, fontSize:18 }} size="large" onClick={() => navigate("/rules")}>Rules</Button>
            </Row>
        </div >
    )
}
export default Home