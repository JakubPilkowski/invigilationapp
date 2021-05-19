import React, { createContext, memo } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

export const socketServer = 'http://localhost:8000';

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = socketIOClient(socketServer, {
    auth: {
      token: localStorage.getItem('token'),
    },
  });
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default memo(SocketProvider);
