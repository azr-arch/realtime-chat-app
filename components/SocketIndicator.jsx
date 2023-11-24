"use client";

import { useSocket } from "@context/SocketContext";
import { useEffect, useState } from "react";

let limit = 5;
const SocketIndicator = () => {
    const { isConnected, socket } = useSocket();
    const [isMounted, setIsMounted] = useState(false); // for hydration errors

    // const handleRegister = async () => {
    //     try {
    //         const ack = await new Promise((resolve, reject) => {
    //             socket.emit("REGISTER", { userId: session.user.sub }, (err, getAck) => {
    //                 if (err) reject(err);
    //                 else resolve(getAck);
    //             });
    //         });

    //         if (limit === 0 && !ack.success) {
    //             alert("Something went wrong while registering user!");
    //             return;
    //         }

    //         if (!ack.success) {
    //             // Retry
    //             limit -= 1;
    //             setTimeout(handleRegister, 10000);
    //             return;
    //         }

    //         // Reset limit
    //         limit = 5;
    //         console.log("Registered user!");
    //         return;
    //     } catch (error) {
    //         limit -= 1;
    //         console.log("error registering user in sockets");
    //         setTimeout(handleRegister, 10000);
    //     }
    // };

    // useEffect(() => {
    //     if (session?.user) {
    //         handleRegister();
    //     }

    //     return () => {
    //         socket?.off("REGISTER");
    //     };
    // }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div
            title="online-status"
            className={`w-2 aspect-square rounded-full ${
                isConnected ? "bg-green-500" : "bg-yellow-500"
            } absolute top-2 left-2 z-20`}
        ></div>
    );
};

export default SocketIndicator;
