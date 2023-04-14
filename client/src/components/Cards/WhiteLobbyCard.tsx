import { Button, List, Result } from 'antd';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import socketContext from '../../context/SocketContext';
import { joinRoom } from '../../hooks/functions';

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
text-align: center;
`
const Title = styled.h3`
font-weight: 500;
letter-spacing: 0.05em;
`

const JoinButton = styled(Button)`
position: absolute;
bottom: 20px;
left: 0;
right: 0;
margin: 0 20px
`
interface WhiteLobbyCard {
    roomName: string,
    players: Array<string> | undefined,
    join?: boolean
}

const WhiteLobbyCard = ({ roomName, players, join = false }: WhiteLobbyCard) => {
    const { socket } = useContext(socketContext).socketState;
    const navigate = useNavigate()

    return (
        players === undefined ?
            <Result
                status="warning"
                title="This room do not exist anymore."
                extra={
                    <Button type="primary" key="console" onClick={() => navigate("/")}>
                        Go to the homepage
                    </Button>
                }
            /> :
            <Card>
                <Front>
                    <Title style={{ color: "#000000" }}>{roomName}</Title>
                    <List
                        header={<div>Players inside: {players?.length} </div>}
                        dataSource={players}
                        renderItem={(item: string) => <List.Item style={{ textAlign: "center" }}>{item}</List.Item>}
                    />
                    {join &&
                        <JoinButton type="primary" onClick={() => joinRoom(socket, roomName, navigate)}>
                            Connect
                        </JoinButton>}
                </Front>
            </Card >
    )
}
export default WhiteLobbyCard;
