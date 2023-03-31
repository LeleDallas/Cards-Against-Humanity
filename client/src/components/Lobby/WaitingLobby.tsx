import { Button, Input, Row, message } from "antd"
import { useContext, useEffect, useState } from "react"
import socketContext, { SocketContextState } from "../../context/SocketContext"
import { useNavigate } from "react-router-dom"
import SpinningCard from "../Cards/StaticCard"



const WaitingLobby = ({...props}) => {
const { socket, uid, users, rooms } = useContext(socketContext).socketState;
console.log(props)
    return (
        <div>
            <p>Users Online: {users.length}</p>
            <StaticCard></StaticCard>
        </div >
    )
}
export default WaitingLobby