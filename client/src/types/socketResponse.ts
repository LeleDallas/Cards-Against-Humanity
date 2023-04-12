export type SocketRoomResponse = {
    success: boolean,
    data: {
        roomName: string
        users: Array<string>
    }
}
export type SocketGameStartResponse = {
    success: boolean,
    isCzar: string
}