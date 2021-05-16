import React, { createContext, useEffect, useRef } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
const server = 'http://localhost:8000';

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = socketIOClient(server);

  // useEffect(() => {
  //   socket.open();
  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
