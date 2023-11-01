"use client";

import { useSocket } from "@context/SocketContext";
import { useEffect, useState } from "react";

const SocketIndicator = () => {
    const { isConnected } = useSocket();
    const [isMounted, setIsMounted] = useState(false); // for hydration errors

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
