"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      const socket = io();

      socket.on("connection", () => {
        console.log("user connected");
      });

      socket.on("hello", (data) => {
        console.log("hello", data);
      });

      socket.on("a user connected", () => {
        console.log("a user connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    }, []);

    // Handle socket events here
    // setSocket(socketInit);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
