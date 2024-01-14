"use client";

import { useState, useEffect, useRef } from "react";

import { Button } from "@components/ui/button";
import { PhoneCall, PhoneIncoming, PhoneOff, ThumbsUp } from "lucide-react";
import { useSocket } from "@context/SocketContext";

export const NotifyCallModal = ({ isOpen = false, from, onConfirm, onReject }) => {
    return (
        <>
            <div
                id="call-notification"
                className="
                     py-4 rounded-md px-2 space-y-2 fixed z-50 right-[5vw] max-w-[500px] translate-x-full top-9  opacity-0 
                     bg-black/90"
                data-state={isOpen ? "open" : "closed"}
            >
                <p className="text-heading text-base truncate">{from} has initiated a video call</p>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-500 hover:bg-green-700"
                        onClick={onConfirm}
                    >
                        <PhoneIncoming className="w-5 h-5" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500 hover:bg-red-700 "
                        onClick={onReject}
                    >
                        <PhoneOff className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};
