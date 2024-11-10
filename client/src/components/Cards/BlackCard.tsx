import styled from 'styled-components';
import { cardHeight, cardWidth } from '../../hooks/style.utils';

const Card = styled.div<any>`
height: ${cardHeight};
width: ${cardWidth};
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
  children?: JSX.Element | JSX.Element[],
}

const BlackCard = ({ cardStyle = {}, title = "Cards Against Humanity? More like ____________.", children }: BlackProps) =>
  <Card cardStyle={cardStyle}>
    <Front>
      <Title style={{ color: "#fff" }}>{title}</Title>
      {children}
    </Front>
  </Card>

export default BlackCard;
