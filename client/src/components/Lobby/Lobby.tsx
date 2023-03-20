import { Button, List, Row } from "antd"
import { useEffect, useState } from "react"
import { SocketContextState } from "../../context/SocketContext"


const Lobby = ({ socket, users, uid }: SocketContextState) => {
    const [rooms, setRooms] = useState<Map<any, any>>(new Map())
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        socket?.emit('get_rooms', (response: any) => {
            const newRooms = new Map();
            for (const [key, value] of Object.entries(response.data)) {
                if (key.startsWith('room')) {
                    newRooms.set(key, value);
                }
            }
            setRooms(newRooms);
        });
    }, [update]);


    return (
        <div>
            <p> Users Online: {users.length}</p>
            {Array.from(rooms.keys()).map((room) => (
                <div key={room}>{room}</div>
            ))}
            <Row>
                <Button onClick={() => socket?.emit("join_room", "room_id", (response: any) => console.log('Server responded with:', response))}>Connect 1</Button>
                <Button onClick={() => socket?.emit("join_room", "room_id1", (response: any) => console.log('Server responded with:', response))}>Connect 2</Button>
            </Row>
            <Row>
                <Button onClick={() => socket?.emit("create_room", "room_id", (response: any) => console.log('Server responded with:', response))}>Create 1</Button>
                <Button onClick={() => socket?.emit("create_room", "room_id1", (response: any) => console.log('Server responded with:', response))}>Create 2</Button>
            </Row>
        </div >
    )
}
export default Lobby