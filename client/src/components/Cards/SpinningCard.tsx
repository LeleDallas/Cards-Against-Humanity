import styled, { keyframes } from 'styled-components';

const Container = styled.div`
position: absolute;
transform: translate(-50%, -50%);
top: 50%;
left: 50%;
perspective: 50em;
`

const Card = styled.div`
height: 25em;
width: 18.75em;
position: relative;
font-family: "Poppins", sans-serif;
animation: ${keyframes`
  100% {
    transform: rotateY(360deg);
  }
`} 5s infinite linear;
transform-style: preserve-3d;
`

const Center = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;
`

const Front = styled(Center)`
background-color: #ffffff;
height: 100%;
width: 100%;
font-size: 1.2em;
border-radius: 0.6em;
backface-visibility: hidden;
border: 1px solid #000
`
const Back = styled(Center)`
height: 100%;
width: 100%;
font-size: 1.2em;
border-radius: 0.6em;
backface-visibility: hidden;
background-color: #000000;
position: relative;
transform: rotateY(180deg);
bottom: 100%;
`
const Title = styled.h3`
font-weight: 500;
letter-spacing: 0.05em;
`

const Paragraph = styled.p`
color: #838094;
font-size: 0.8em;
font-weight: 300;
letter-spacing: 0.05em;
`

const SpinningCard = () =>
  <Container>
    <Card>
      <Front>
        <Title style={{ color: "#000000" }}>Cards Against Humanity</Title>
        <Paragraph>Trying to __________________</Paragraph>
      </Front>
      <Back>
        <Title style={{ color: "#ffffff" }}>Loading...</Title>
        <Paragraph>________ the server</Paragraph>
      </Back>
    </Card>
  </Container>

export default SpinningCard;
