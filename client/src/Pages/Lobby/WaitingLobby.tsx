import { LeftOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Row } from "antd"
import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import WhiteLobbyCard from "../../components/Cards/WhiteLobbyCard"
import socketContext from "../../context/SocketContext"
import { deleteRoom, fetchCards, leaveRoom, startGame } from "../../hooks/functions"
import { useAppSelector } from "../../hooks/hooks"
import { waitingMargin } from "../../hooks/style.utils"

const WaitingLobby = () => {
    const { socket, rooms } = useContext(socketContext).socketState;
    const navigate = useNavigate()
    const { state } = useLocation();
    const dispatch = useDispatch()
    const white = useAppSelector(state => state.whiteCards.cards)
    const black = useAppSelector(state => state.blackCards.cards)
    useEffect(() => {
        if (white?.length === 0 || black?.length === 0)
            fetchCards(dispatch)
    }, [white?.length === 0 || black?.length === 0]);


    return (
        <div style={{ margin: 30 }}>
            <Row justify="space-between">
                {state?.type === "admin" ?
                    <Popconfirm
                        title="Leave room alert"
                        description="Are you sure to exit and delete this room?"
                        onConfirm={() => deleteRoom(socket, state?.roomName, navigate)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<LeftOutlined />} type="primary" >Back</Button>
                    </Popconfirm> :
                    <Button icon={<LeftOutlined />} type="primary" onClick={() => {
                        leaveRoom(socket, state?.roomName, false, "", navigate)
                    }}>Back</Button>
                }
            </Row>
            <Row justify="center" style={{ marginTop: waitingMargin }}>
                <WhiteLobbyCard roomName={state?.roomName} players={rooms[state?.roomName]} />
            </Row>
            <Row justify="center" style={{ marginTop: 22 }}>
                {rooms[state?.roomName] && state?.type === "admin" &&
                    <Button
                        onClick={() => startGame(socket, state?.roomName, navigate)}
                        style={{ width: 200 }}
                        type="primary"
                        size="large"
                    >
                        Start Game
                    </Button>
                }
            </Row>
        </div >
    )
}
export default WaitingLobby