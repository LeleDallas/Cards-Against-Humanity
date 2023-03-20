import { Button, Col, Input, Row, message } from "antd"
import { useContext, useEffect, useState } from "react"
import socketContext, { SocketContextState } from "../../context/SocketContext"

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
        console.log(Object.entries(rooms))
        Object.keys(rooms).forEach(function (key, index) {
            rooms[key] *= 2;
        });
    }, [rooms]);


    return (
        <div>
            <p>Users Online: {users.length}</p>
            <Row justify="space-between">
                <Input placeholder="Lobby name" onChange={(value) => setLobbyName(value.target.value)} />
                <Button onClick={() => createRoom()}>Create Lobby</Button>
                {Object.keys(rooms).map((key, index) =>
                    <Button key={key}
                        onClick={() =>
                            socket?.emit(
                                "join_room",
                                key,
                                (response: any) => console.log('Server responded with:', response)
                            )}
                    >
                        Connect {key}
                    </Button>)}
            </Row>
        </div >
    )
}
export default Lobby