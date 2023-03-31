import styled from 'styled-components';

const Card = styled.div`
height: 25em;
width: 18.75em;
position: relative;
font-family: "Poppins", sans-serif;
border-radius: 0.6em;
border: 1px solid #fff;

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

const BlackCard = (props: any) =>
  <Card>
    <Front>
      <Title style={{ color: "#fff" }}>Cards Against Humanity? More like ____________.</Title>
    </Front>
  </Card>

export default BlackCard;
