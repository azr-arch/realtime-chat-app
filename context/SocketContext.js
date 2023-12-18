"use client";

import useActiveList from "@hooks/use-active-list";
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

    const { remove, set } = useActiveList();

    useEffect(() => {
        const userEmail = JSON.parse(localStorage.getItem("UserEmail"));

        const socketInstance = new ClientIO({
            path: "/api/socket/io",
        });

        socketInstance.on("connect", () => {
            if (userEmail) {
                console.log("socket is registered with ", userEmail);
                socketInstance.emit("REGISTER", { email: userEmail });
            }
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("client socket disconnected.");
            setIsConnected(false);
        });

        socketInstance.on("ACTIVE_USERS", (activeUsersArr) => {
            set(activeUsersArr);
        });

        socketInstance.on("ACTIVE_USERS:REMOVE", (data) => {
            console.log("remove a active user ", data);
            remove(data);
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
