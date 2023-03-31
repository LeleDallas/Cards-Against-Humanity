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

let names = ["name1", "name2", "name3"]

const StaticCard = () =>
  <Container>
    <Card>
      <Front>
        <Title style={{ color: "#000000" }}>Cards Against Humanity</Title>
        {names.map(name => <Paragraph key={name}>{name}</Paragraph>)}
      </Front>
    </Card>
  </Container>

export default StaticCard;
