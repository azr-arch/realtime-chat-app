"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

const SocketContext = createContext({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const socketInstance = new ClientIO({
            path: "/api/socket/io",
        });

        socketInstance.on("connect", () => {
            console.log("client socket connected.");
            if (session && session?.user?.email) {
                socket.emit("REGISTER", { email: session.user.email });
            }
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("client socket disconnected.");
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
    );
};
