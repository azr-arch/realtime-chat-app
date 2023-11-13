"use client";

import { useState, useEffect, useRef } from "react";

import { Button } from "@components/ui/button";
import { PhoneCall, PhoneOff } from "lucide-react";
import { useSocket } from "@context/SocketContext";

export const NotifyCallModal = ({ isOpen = false, onClose, from, session, onSuccess }) => {
    const { socket } = useSocket();

    return (
        <>
            <div
                id="call-notification"
                className="
                     py-4 rounded-md px-2 fixed z-50 right-[5vw] translate-x-full top-9  opacity-0 
                     bg-black/80"
                data-state={isOpen ? "open" : "closed"}
            >
                <div className="text-white font-medium space-x-4 flex items-center">
                    <p>Incoming call from {from}</p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            size="icon"
                            className="bg-green-500 hover:bg-green-700"
                            onClick={onSuccess}
                        >
                            <PhoneCall />
                        </Button>
                        <Button onClick={onClose} size="icon" variant="destructive">
                            <PhoneOff />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
