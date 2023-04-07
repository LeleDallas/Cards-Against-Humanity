import { Button, Popconfirm, Row } from "antd"
import { useContext, useEffect, useState } from "react"
import socketContext from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import { LeftOutlined } from "@ant-design/icons"
import WhiteLobbyCard from "../Cards/WhiteLobbyCard"
import { SocketRoomResponse } from "../../types/socketResponse"
import { isMobile } from "react-device-detect"

const WaitingLobby = ({ ...props }) => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();

    const [black, setBlacks] = useState([]);
    const [white, setWhites] = useState([]);
    const [deck, setDeck] = useState([])
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cards/', { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                setBlacks(data.filter((el: any) => el.isBlack == true));
                setWhites(data.filter((el: any) => el.isBlack == false));
            }).then(() => {
                setDeck([...white].sort(() => 0.5 - Math.random()).slice(0, 10))
                setQuestion(black[Math.floor(Math.random() * black.length)])
                console.log(question, deck);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between">
                {state?.type === "admin" ?
                    <Popconfirm
                        title="Leave room alert"
                        description="Are you sure to exit and delete this room?"
                        onConfirm={() => {
                            socket?.emit("delete_room", state?.lobbyName, (response: SocketRoomResponse) => {
                                response?.success &&
                                    navigate("/")
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<LeftOutlined />} type="primary" >Back</Button>
                    </Popconfirm> :
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {
                        socket?.emit("leave_room", state?.lobbyName, (response: any) => {
                            if (response.success) {
                                navigate(-1)
                            }
                        })
                    }}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: isMobile ? 22 : 0 }}>
                <WhiteLobbyCard lobbyName={state?.lobbyName} players={rooms[state?.lobbyName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                {state?.type === "admin" && <Button style={{ width: 200 }} type="primary" size="large" onClick={() => { }}>Start Game</Button>}
            </Row>
        </div >
    )
}
export default WaitingLobby