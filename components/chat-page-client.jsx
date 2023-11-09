"use client";

import React, { useCallback, useEffect, useState } from "react";
import Contacts from "./contact/Contacts";
import ChatContainer from "./chat/ChatContainer";

import { NotifyCallModal } from "./modals/call-notification";
import VideoModal from "./modals/video-modal";
import { useSocket } from "@context/SocketContext";
import { usePeer } from "@context/peer";

const ChatPageClient = () => {
    const [open, setOpen] = useState(false);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [calleeData, setCalleeData] = useState(null); // Email
    const { createAnswer } = usePeer();

    const { socket } = useSocket();

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setCalleeData(from);
        setOpen(true);
        const ans = await createAnswer(offer);
        socket.emit("CALL_ACCEPTED", { ans, to: from });
    }, []);

    useEffect(() => {
        socket?.on("INCOMING_CALL", handleIncomingCall);

        return () => {
            socket?.off("INCOMING_CALL", handleIncomingCall);
        };
    }, []);

    return (
        <>
            {videoModalOpen && <VideoModal />}
            <NotifyCallModal isOpen={open} onClose={() => setOpen(false)} from={calleeData} />
            <button className="fixed top-4  z-50 left-10" onClick={() => setOpen(true)}>
                {" "}
                toggle
            </button>
            <Contacts />
            <ChatContainer />
        </>
    );
};

export default ChatPageClient;
