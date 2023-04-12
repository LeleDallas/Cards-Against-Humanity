import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface SocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: Array<string>;
    rooms: any;
    black_card: string;
    czarSocketId: string;
    white_card: Map<string, string>
    score: Map<string, number>,
}

export const defaultSocketContextState: SocketContextState = {
    socket: undefined,
    uid: '',
    users: [],
    rooms: {},
    black_card: "",
    czarSocketId: "",
    white_card: new Map(),
    score: new Map()
};

export type SocketContextActions =
    'update_socket' |
    'update_uid' |
    'update_users' |
    'remove_user' |
    'room' |
    'update_rooms' |
    'start_game' |
    'get_black_card' |
    'set_czar' |
    'get_white_card' |
    'reset_white_card' |
    'update_score' |
    'reset_score'
    ;

type UserToCard = {
    user: string;
    cardTitle: string
}

export type SocketContextPayload = string | Array<string> | Socket | UserToCard | Map<string, number>;

export interface SocketContextActionsPayload {
    type: SocketContextActions;
    payload: SocketContextPayload;
}

export const socketReducer = (state: SocketContextState, action: SocketContextActionsPayload) => {
    console.log('Message received - Action: ' + action.type + ' - Payload: ', action.payload);
    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_uid':
            return { ...state, uid: action.payload as string };
        case 'update_users':
            return { ...state, users: action.payload as Array<string> };
        case 'remove_user':
            return { ...state, users: state.users.filter((uid) => uid !== (action.payload as string)) };
        case 'update_rooms':
            return { ...state, rooms: action.payload as any };
        case 'get_black_card':
            return { ...state, black_card: action.payload as string };
        case 'set_czar':
            return { ...state, czarSocketId: action.payload as string };
        case 'get_white_card':
            let newMap = new Map(state.white_card)
            let payload = action.payload as UserToCard
            newMap.set(payload.user, payload.cardTitle)
            return { ...state, white_card: newMap };
        case 'reset_white_card':
            return { ...state, white_card: new Map() };
        case 'update_score':
            return { ...state, score: action.payload as Map<string, number>, };
        case 'reset_score':
            return { ...state, score: new Map(), };
        default:
            return state;
    }
};

export interface SocketContextProps {
    socketState: SocketContextState;
    socketDispatch: React.Dispatch<SocketContextActionsPayload>;
}

const socketContext = createContext<SocketContextProps>({
    socketState: defaultSocketContextState,
    socketDispatch: () => { }
});

export const SocketContextConsumer = socketContext.Consumer;
export const SocketContextProvider = socketContext.Provider;

export default socketContext;