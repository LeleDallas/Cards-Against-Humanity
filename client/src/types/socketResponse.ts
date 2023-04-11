export type SocketRoomResponse = {
    success: boolean,
    data: {
        lobbyName: string
        users: Array<string>
    }
}
export type SocketGameStartResponse = {
    success: boolean,
    isCzar: string
}