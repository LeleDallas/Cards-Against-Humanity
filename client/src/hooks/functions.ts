import { Action } from "@reduxjs/toolkit";
import { message } from "antd";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { updateBlack, updateWhite } from "../reducers";
import { Cards } from "../types/cards";
import { SocketGameStartResponse, SocketRoomResponse } from "../types/socketResponse";

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

export const joinRoom = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    socket?.emit("join_room", roomName, (response: any) => {
        if (response.success) {
            navigate("/waiting", { state: { roomName, type: "user" } })
        }
    })
}

export const drawBlackCard = (black: Array<Cards>): Cards =>
    black[Math.floor(Math.random() * black.length)];

export const drawWhiteCards = (white: Array<Cards>, quantity: number): Array<Cards> =>
    [...white].sort(() => 0.5 - Math.random()).slice(0, quantity);


export const drawNew = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    czarSocketId: string,
    playerHand: Array<Cards>,
    selected: string,
    white: any,
    setSelected: (string: string) => void,
    setPlayerHand: React.Dispatch<React.SetStateAction<Cards[]>>,
    setHasPlayed: (userSelected: boolean) => void,
) => {
    if (socket)
        sendWhiteResponse(socket!, czarSocketId, selected, socket?.id)
    setPlayerHand(playerHand.filter((card, _) => card.title !== selected))
    setPlayerHand((oldHand: Array<Cards>) => [...oldHand, ...drawWhiteCards(white, 1)]);
    setSelected("")
    setHasPlayed(true)
}

export const setCurrentSolution = (
    solution: string,
    selected: string,
    userSelected: string,
    setSelected: (string: string) => void,
    setSolution: (isSelected: boolean) => void,
    setSelectedUser: (userSelected: string) => void
) => {
    if (solution !== selected && selected !== solution) {
        setSelected(solution)
        setSolution(true)
        setSelectedUser(userSelected)
    }
    else {
        setSelected("")
        setSelectedUser("")
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
    user: string
) => {
    socket?.emit("send_white_card", czarSocketId, card, user, (response: SocketGameStartResponse) => { })
}

const updateScore = (oldScore: Map<string, number>, userKey: string) => {
    if (userKey === "")
        return oldScore
    const newScore = new Map();
    oldScore.forEach((item: any) => newScore.set(item[0], item[1]));
    newScore.set(userKey, newScore.get(userKey)! + 1);
    return newScore
}

export const onConfirm = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    oldScore: Map<string, number>,
    newCzarId: string,
    hasPlayed: boolean
) => {
    socket?.emit("request_update_score", roomName, Array.from(updateScore(oldScore, newCzarId)))
    socket?.emit("reset_turn", roomName, hasPlayed, (response: SocketGameStartResponse) => { })
}

export const resetWhite = (socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined, czarSocketId: string) => {
    socket?.emit("reset_white", czarSocketId, (response: SocketGameStartResponse) => {
    })
}

export const resetScore = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string) => {
    socket?.emit("request_reset_score", roomName)
}

export const startGame = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction
) => {
    socket?.emit("request_start_game", roomName, (response: SocketGameStartResponse) => {
        if (response?.success) {
            message.success("Game started!")
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

export const nextCzar = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
    roomName: string,
    navigate: NavigateFunction,
    newCzarId: string,
    exit: boolean = false
) => {
    socket?.emit("update_turn", roomName, newCzarId, (response: SocketGameStartResponse) => {
        if (response?.success && !exit) {
            navigate("/game", {
                state: {
                    isCzar: response.isCzar,
                    roomName: roomName
                }
            })
        }
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
    inGame: boolean,
    lobbyType: string,
    navigate: NavigateFunction,
    score?: Map<string, number>
) => {
    socket?.emit("leave_room", roomName, inGame, (response: SocketRoomResponse) =>
        response?.success && navigate("/"))
    if (lobbyType === "czar")
        nextCzar(socket, roomName, navigate, "", true)
    if (score) {
        let newScore = new Map(score)
        socket != undefined && newScore.delete(socket.id)
        socket?.emit("request_update_score", roomName, Array.from(updateScore(newScore, "")))
    }
}

export const checkScore = (players: Array<User>) => {
    let res = players.filter(playerStatus => playerStatus.score > 5)
    return { status: res.length > 0, res }
}

export const fetchCards = (dispatch: Dispatch<Action>) => {
    fetch('http://localhost:3000/cards/', { mode: 'cors' })
        .then((res) => res.json())
        .then((data) => {
            dispatch(updateBlack(data.filter((card: Cards) => card.isBlack)));
            dispatch(updateWhite(data.filter((card: Cards) => !card.isBlack)));
        })
        .catch((err) => {
            console.log(err.message);
        });
}
