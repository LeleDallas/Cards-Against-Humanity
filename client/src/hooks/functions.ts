import { Socket } from "socket.io-client";
import { Cards } from "../types/cards";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketGameStartResponse, SocketRoomResponse } from "../types/socketResponse";

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

// export const sendBlack = (socket:Socket<DefaultEventsMap, DefaultEventsMap> | undefined, card:string) => {
//     socket?.emit("send_black_card", card, (response: SocketRoomResponse) => {
//     })
// }

export const sendWhiteResponse = (
    socket: Socket,
    czarSocketId: string,
    card: string,
) => {
    socket?.emit("send_white_card", czarSocketId, card, (response: SocketGameStartResponse) => {
    })
}  
