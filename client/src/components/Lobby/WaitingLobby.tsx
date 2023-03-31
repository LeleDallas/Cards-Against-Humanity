import { Button, Input, Row, message } from "antd"
import { useContext, useEffect, useState } from "react"
import socketContext, { SocketContextState } from "../../context/SocketContext"
import { useLocation, useNavigate } from "react-router-dom"
import StaticCard from "../Cards/StaticCard"




const WaitingLobby = ({...props}) => {
const { socket, uid, users, rooms } = useContext(socketContext).socketState;
const { state } = useLocation();
console.log(state)
    return (
        <div>
            <StaticCard></StaticCard>
            {state.type == "admin" && <Button>Start Game</Button>}
        </div >
    )
}
export default WaitingLobby