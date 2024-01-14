"use client";

import React, { useCallback, useEffect, useState } from "react";
import Contacts from "./contact/Contacts";
import ChatContainer from "./chat/ChatContainer";

import { NotifyCallModal } from "./modals/call-notification";
import VideoModal from "./modals/video-modal";
import { useSocket } from "@context/SocketContext";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@context/ChatContext";
import { toast } from "react-hot-toast";

const ChatPageClient = () => {
    const [open, setOpen] = useState(false);
    const [calleeData, setCalleeData] = useState({ from: "", chatId: "" }); // Email
    const { data: session } = useSession();
    const { socket } = useSocket();

    const { chats, handleSetCurrChat } = useChat();

    const router = useRouter();
    const searchParams = useSearchParams();

    // On receive call
    const onConfirm = () => {
        const filterChat = chats?.filter((chat) => chat._id === calleeData.chatId);

        if (!filterChat[0]) {
            toast.error("Error while receiving call");
            return;
        }

        handleSetCurrChat(filterChat[0]);
        router.push("/chat?video=true", { shallow: true });

        setOpen(false);
    };

    const removeVideoParam = useCallback(() => {
        const isVideoEnable = searchParams.get("video");
        if (!isVideoEnable) return;

        router.push("/chat", { shallow: true });
    }, [router, searchParams]);

    // On end call
    const rejectCall = useCallback(() => {
        setOpen(false);
        removeVideoParam();
        router.refresh();
    }, [removeVideoParam, router]);

    useEffect(() => {
        socket?.on("INCOMING_CALL", ({ from, chatId }) => {
            if (from) {
                setCalleeData({ from, chatId });
                setOpen(true);
            }
        });

        // Call ended from initiator
        socket?.on("CALL_ENDED", () => {
            setOpen(false);
            removeVideoParam();
            router.refresh();
        });

        return () => {
            socket?.off("INCOMING_CALL");
            socket?.off("CALL_ENDED");
        };
    }, [socket, router, removeVideoParam]);

    return (
        <>
            <NotifyCallModal
                isOpen={open}
                from={calleeData.from}
                onConfirm={onConfirm}
                onReject={rejectCall}
            />

            <Contacts />
            <ChatContainer />
        </>
    );
};

export default ChatPageClient;
