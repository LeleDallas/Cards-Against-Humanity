import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { defaultSocketContextState, SocketContextProvider, socketReducer } from './SocketContext'
import 'antd/dist/reset.css';
import SpinningCard from '../components/Cards/SpinningCard';

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

        socket.on('user_disconnected', (uid: string) => {
            console.info('User disconnected message received');
            socketDispatch({ type: 'remove_user', payload: uid });
            // socket.disconnect()
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

        socket.on('event', () => console.info('Event.'));

        socket.on('update_rooms', (rooms: any) => socketDispatch({ type: "update_rooms", payload: rooms?.data }));
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