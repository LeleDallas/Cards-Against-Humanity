import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Center = styled.div`
position: absolute;
top: 50%;
left: 50%;
margin: -100px 0 0 -150px;
text-align: center
`
const ErrorRoute = () => {
    const navigate = useNavigate()
    return (
        <Center >
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Button onClick={() => navigate("/")}>Go to homepage</Button>
        </Center>
    );
}

export default ErrorRoute