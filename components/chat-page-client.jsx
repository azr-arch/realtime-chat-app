"use client";

import React, { useCallback, useEffect, useState } from "react";
import Contacts from "./contact/Contacts";
import ChatContainer from "./chat/ChatContainer";

import { NotifyCallModal } from "./modals/call-notification";
import VideoModal from "./modals/video-modal";
import { useSocket } from "@context/SocketContext";
import { useSession } from "next-auth/react";

const ChatPageClient = () => {
    const [open, setOpen] = useState(false);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [calleeData, setCalleeData] = useState({ from: null, offer: null }); // Email
    const { data: session } = useSession();
    const { socket } = useSocket();

    // useEffect(() => {

    //     return () => {
    //     };
    // }, []);

    return (
        <>
            {/* {videoModalOpen && (
                <VideoModal
                    isOpen={videoModalOpen}
                    onClose={() => setVideoModalOpen(false)}
                    session={session}
                    receiver={calleeData.from}
                    isInitiator={true}
                />
            )}
            <NotifyCallModal
                isOpen={open}
                onClose={endCall}
                from={calleeData?.from}
                onSuccess={acceptCall}
            /> */}
            <Contacts />
            <ChatContainer />
        </>
    );
};

export default ChatPageClient;
