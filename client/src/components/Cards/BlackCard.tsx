import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Card = styled.div<any>`
height: ${isMobile ? "18em" : "25em"};
width: ${isMobile ? "13.75em" : "18.75em"};
position: relative;
font-family: "Poppins", sans-serif;
border-radius: 0.6em;
border: 1px solid #fff;
${props => props.cardStyle}

`
const Front = styled.div`
padding:20px;
background-color: #000000;
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

interface BlackProps {
  title?: string,
  cardStyle?: React.CSSProperties,
  frontStyle?: React.CSSProperties,
  children?: JSX.Element | JSX.Element[],
  hoverable?: boolean,
  selected?: boolean,
}

const BlackCard = ({ cardStyle = {}, title = "Cards Against Humanity? More like ____________.", children }: BlackProps) =>
  <Card cardStyle={cardStyle}>
    <Front>
      <Title style={{ color: "#fff" }}>{title}</Title>
      {children}
    </Front>
  </Card>

export default BlackCard;
