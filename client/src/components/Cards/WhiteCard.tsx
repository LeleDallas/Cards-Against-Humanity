import styled, { keyframes } from 'styled-components';

const Card = styled.div`
height: 25em;
width: 18.75em;
position: relative;
font-family: "Poppins", sans-serif;
border: 1px solid #000;
border-radius: 0.6em;
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

const WhiteCard = () =>
    <Card>
        <Front>
            <Title style={{ color: "#000000" }}>Cards Against Humanity</Title>
        </Front>
    </Card>

export default WhiteCard;
