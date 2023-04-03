export type SocketRoomResponse = {
    success: boolean,
    data: {
        lobbyName: string
        users: Array<string>
    }
}