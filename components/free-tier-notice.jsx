"use client";

import { useSocket } from "@context/SocketContext";
import { useEffect, useState } from "react";

export const FreeTierNotice = () => {
    const [showNotice, setShowNotice] = useState(false);
    const { socket } = useSocket();

    useEffect(() => {
        const connectionTimer = setTimeout(() => {
            setShowNotice(true);
        }, 3000); // Show notice after 3 seconds delay

        // Check if connection established
        socket?.on("connect", () => {
            clearTimeout(connectionTimer);
            setShowNotice(false);
        });

        return () => clearTimeout(connectionTimer);
    }, [socket]);

    return showNotice ? (
        <div className="fixed inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md text-center">
                <div className="animate-spin mb-4">⏳</div>
                <h2 className="text-xl font-bold mb-2">One Moment Please...</h2>
                <p className="mb-4">
                    This project is hosted on free-tier infrastructure. The server is waking up and
                    should be ready in
                    <span className="font-bold"> 30-60 seconds</span>.
                </p>
                <p className="text-sm opacity-75">Thank you for your patience! 🙏</p>
            </div>
        </div>
    ) : null;
};
