import React, { useContext, createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
// import scheDuleLocalNotification from "../app/chat/notify";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    console.log("connected")
    // Initialize socket connection
    socket.current = io("http://192.169.1.154:8080");

    socket.current.emit("joinchat")

    return () => {
     socket.current.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
