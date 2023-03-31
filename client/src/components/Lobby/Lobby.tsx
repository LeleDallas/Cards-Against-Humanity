import { Button, Input, Row, message } from "antd"
import { useEffect, useState } from "react"
import { SocketContextState } from "../../context/SocketContext"
import { useNavigate } from "react-router-dom"



const Lobby = ({ socket, users, uid, rooms }: SocketContextState) => {
    const [update, setUpdate] = useState<boolean>(false)
    const [lobbyName, setLobbyName] = useState<string>("")
    const navigate = useNavigate()

    const createRoom = () => {
        if (lobbyName.length === 0) {
            message.error("Insert a Lobby name")
            return
        }
        socket?.emit("create_room", lobbyName, (response: any) => console.log('Server responded with:', response))
        setUpdate(!update)
        navigate("/waiting",{state: {lobbyName, type: "admin"}})
    }

    const joinRoom = () => {
        socket?.emit("join_room", lobbyName, (response: any) => console.log('Server responded with:', response))
        setUpdate(!update)
        navigate("/waiting",{state: {lobbyName, type: "user"}})
    }

    useEffect(() => {
    }, [rooms]);

    return (
        <div>
            <p>Users Online: {users.length}</p>
            <Row justify="space-between">
                <Input placeholder="Lobby name" onChange={(value) => setLobbyName(value.target.value)} />
                <Button onClick={() => createRoom()}>Create Lobby</Button>
                {Object.keys(rooms).map((key, index) =>
                    <Button
                        key={key}
                        onClick={() => joinRoom()}
                    >
                        Connect {key}
                    </Button>)}
            </Row>
        </div >
    )
}
export default Lobby