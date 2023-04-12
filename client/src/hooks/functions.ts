import { Socket } from "socket.io-client";
import { Cards } from "../types/cards";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketGameStartResponse, SocketRoomResponse } from "../types/socketResponse";
import { NavigateFunction } from "react-router-dom";
import { message } from "antd";

export const createRoom = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    if (roomName.length === 0) {
        message.error("Insert a Lobby name")
        return
    }
    socket?.emit("create_room", roomName, (response: SocketRoomResponse) => {
        if (response.success) {
            navigate("/waiting", { state: { roomName: response.data.roomName, type: "admin" } })
        }
    })
}


export const drawBlackCard = (black: Array<Cards>): Cards =>
    black[Math.floor(Math.random() * black.length)];

export const drawWhiteCards = (white: Array<Cards>, quantity: number): Array<Cards> =>
    [...white].sort(() => 0.5 - Math.random()).slice(0, quantity);


export const drawNew = (playerHand: Array<Cards>, selected: string) =>
    playerHand.filter((card, _) => card.title !== selected)

export const setCurrentSolution = (
    solution: string,
    selected: string,
    setSelected: (string: string) => void,
    setSolution: (isSelected: boolean) => void
) => {
    if (solution !== selected) {
        setSelected(solution)
        setSolution(true)
    }
    else {
        setSelected("")
        setSolution(false)
    }
}

export const sendBlack = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    card: string,
    roomName: string
) => {
    socket?.emit("send_black_card", card, roomName, socket.id, (response: SocketGameStartResponse) => { })
}

export const sendWhiteResponse = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    czarSocketId: string,
    card: string,
) => {
    socket?.emit("send_white_card", czarSocketId, card, (response: SocketGameStartResponse) => { })
}

export const onConfirm = () => {
    //TO DO
    //Notify all
}


export const startGame = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    socket?.emit("request_start_game", roomName, (response: SocketGameStartResponse) => {
        if (response?.success) {
            message.success("Game is starting!")
            navigate("/game", {
                state: {
                    isCzar: response.isCzar,
                    roomName: roomName
                }
            })
        }
        else
            message.error("This room has not reach the minimum people to start a game!")
    })
}

export const deleteRoom = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    socket?.emit("delete_room", roomName, (response: SocketRoomResponse) =>
        response?.success && navigate("/"))
}

export const leaveRoom = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    socket?.emit("leave_room", roomName, (response: SocketRoomResponse) =>
        response?.success && navigate(-1))
}