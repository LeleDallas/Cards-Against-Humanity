import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Card = styled.div<any>`
height: ${isMobile ? "18em" : "25em"};
width: ${isMobile ? "13.75em" : "18.75em"};
position: relative;
font-family: "Poppins", sans-serif;
border: 1px solid #000;
border-radius: 0.6em;
${props => props.cardStyle}
`
const Front = styled.div`
padding:20px;
background-color: #ffffff;
height: 100%;
width: 100%;
font-size: 1.2em;
border-radius: 0.6em;
backface-visibility: hidden;
`
const Title = styled.h3`
font-weight: 500;
letter-spacing: 0.05em;
`

const WhiteCard = ({ cardStyle = {}, title = "Cards Against Humanity" }) =>
    <Card style={cardStyle}>
        <Front>
            <Title style={{ color: "#000000" }}>{title}</Title>
        </Front>
    </Card>

export default WhiteCard;
