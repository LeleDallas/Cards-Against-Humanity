import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { defaultSocketContextState, SocketContextProvider, socketReducer } from './SocketContext'
import 'antd/dist/reset.css';
import SpinningCard from '../components/Cards/SpinningCard';
import { useNavigate } from 'react-router-dom';

export interface SocketContextComponentProps extends PropsWithChildren { }

const SocketContextComponent: React.FunctionComponent<SocketContextComponentProps> = (props) => {
    const { children } = props;

    const socket = useSocket('ws://localhost:3000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    const [socketState, socketDispatch] = useReducer(socketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        socket.connect();
        socketDispatch({ type: 'update_socket', payload: socket });
        startListeners();
        sendHandshake();
    }, []);

    const startListeners = () => {
        socket.on('user_connected', (users: string[]) => {
            console.info('User connected message received');
            socketDispatch({ type: 'update_users', payload: users });
        });

        socket.on('user_disconnected', (data: any) => {
            console.info('User disconnected message received');
            socketDispatch({ type: 'remove_user', payload: data.uid });
            socketDispatch({ type: "update_rooms", payload: data.rooms?.data })
            socketDispatch({ type: 'update_users', payload: data.users });
        });

        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
            sendHandshake();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnection Attempt: ' + attempt);
        });

        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnection error: ' + error);
        });

        socket.io.on('reconnect_failed', () => {
            console.info('Reconnection failure.');
            alert('We are unable to connect you to the chat service.' +
                'Please make sure your internet connection is stable or try again later.');
        });

        socket.on('update_rooms', (rooms: any) => socketDispatch({ type: "update_rooms", payload: rooms?.data }));
        socket.on('start_game', (isCzar: string, roomName: string) => navigate("/game", {
            state: {
                isCzar: isCzar,
                roomName: roomName
            }
        }));

        socket.on('get_black_card', (title: string, czarSocket: string) => {
            socketDispatch({ type: "get_black_card", payload: title })
            socketDispatch({ type: "set_czar", payload: czarSocket })
        });

        socket.on('get_white_card', (cardTitle: string, user: string) => socketDispatch({ type: "get_white_card", payload: { cardTitle, user } }));
        socket.on('reset_white_card', () => socketDispatch({ type: "reset_white_card", payload: "" }));
        socket.on('update_score', (newScore: Map<string, number>) => socketDispatch({ type: "update_score", payload: newScore }))
        socket.on('reset_score', () => socketDispatch({ type: "reset_score", payload: "" }));
        socket.on('new_turn', (hasPlayed: boolean) => socketDispatch({ type: "new_turn", payload: hasPlayed }));
    };

    const sendHandshake = async () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', async (uid: string, users: string[]) => {
            console.info('User handshake callback message received');
            socketDispatch({ type: 'update_users', payload: users });
            socketDispatch({ type: 'update_uid', payload: uid });
            setLoading(false);
        });
    };

    if (loading) return (
        <SpinningCard />
    )

    return <SocketContextProvider value={{ socketState: socketState, socketDispatch: socketDispatch }}> {children} </SocketContextProvider>
};

export default SocketContextComponent;