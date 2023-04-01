import { Button, Input, Row, message } from "antd"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import socketContext from "../../context/SocketContext";
import { LeftOutlined } from "@ant-design/icons";



const CreateLobby = () => {
    const { socket, uid, users, rooms } = useContext(socketContext).socketState;

    const [lobbyName, setLobbyName] = useState<string>("")
    const navigate = useNavigate()

    const createRoom = () => {
        if (lobbyName.length === 0) {
            message.error("Insert a Lobby name")
            return
        }
        socket?.emit("create_room", lobbyName, (response: any) => console.log('Server responded with:', response))
        navigate("/waiting", { state: { lobbyName, type: "admin" } })
    }
    return (
        <>
            <Button style={{ margin: 20 }} icon={<LeftOutlined />} type="primary" onClick={() => navigate("/")}>Back</Button>
            <Row justify="center" align="middle" style={{ position: "absolute", top: "40%", width: "100%" }}>
                <Input autoFocus style={{ textAlign: "center", height: 100, margin: 30, border: "none", fontSize: 22 }} size="large" placeholder="Insert a lobby name" onChange={(value) => setLobbyName(value.target.value)} />
                <Row justify="end">
                    <Button style={{width:200}} type="primary" size="large" onClick={() => createRoom()}>Create Lobby</Button>
                </Row>
            </Row >
        </>
    )
}
export default CreateLobby