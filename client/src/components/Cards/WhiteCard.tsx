import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Card = styled.div<any>`
height: ${isMobile ? "18em" : "25em"};
width: ${isMobile ? "13.75em" : "18.75em"};
position: relative;
font-family: "Poppins", sans-serif;
border-radius: 0.6em;
${(props) => props.cardStyle}
`
const Front = styled.div<any>`
padding:20px;
background-color: #ffffff;
height: 100%;
width: 100%;
font-size: 1.2em;
border-radius: 0.6em;
border: 1px solid #000;
backface-visibility: hidden;
${props => props?.selected && `
    transform: scale(1.10);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 10;
    border: 1px solid #F0A500;`
    }
${props => props?.hoverable &&
        `&:hover{
        transform: scale(1.10);
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        z-index: 10;
        transition: 0.5s}`
    }
${(props) => props?.frontStyle}

`
const Title = styled.h3`
font-weight: 500;
letter-spacing: 0.05em;
`

interface WhiteProps {
    title?: string,
    cardStyle?: React.CSSProperties,
    frontStyle?: React.CSSProperties,
    children?: JSX.Element | JSX.Element[],
    hoverable?: boolean,
    selected?: boolean,
}

const WhiteCard = ({ cardStyle = {}, frontStyle = {}, title = "Cards Against Humanity", children, ...props }: WhiteProps) =>
    <Card style={cardStyle}>
        <Front {...props}>
            <Title style={{ color: "#000000", ...frontStyle }}>{title}</Title>
            {children}
        </Front>
    </Card>

export default WhiteCard;
