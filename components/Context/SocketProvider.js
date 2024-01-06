"use client";
import { useContext, createContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null || undefined);

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => {
    return io("localhost:8000");
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
