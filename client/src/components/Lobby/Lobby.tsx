import { Button, Input, Row, message } from "antd"
import { useEffect, useState } from "react"
import { SocketContextState } from "../../context/SocketContext"
import { useNavigate } from "react-router-dom"



const Lobby = ({ socket, users, uid, rooms }: SocketContextState) => {
    const [update, setUpdate] = useState<boolean>(false)
    const [lobbyName, setLobbyName] = useState<string>("")

    const createRoom = () => {
        if (lobbyName.length === 0) {
            message.error("Insert a Lobby name")
            return
        }
        socket?.emit("create_room", lobbyName, (response: any) => console.log('Server responded with:', response))
        setUpdate(!update)
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
                        onClick={() =>
                            socket?.emit(
                                "join_room",
                                key,
                                (response: any) => console.log('Server responded with:', response)
                            )

                        }
                    >
                        Connect {key}
                    </Button>)}
            </Row>
        </div >
    )
}
export default Lobby