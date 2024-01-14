"use client";
import Image from "next/image";
import { useEffect, useRef, useState, memo, useLayoutEffect } from "react";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@lib/socket-events";
import useDebounce from "@hooks/use-debounce";

import TypingEffect from "@components/ui/typing-status";
import { Button } from "@components/ui/button";
import { GroupedMessages } from "@components/grouped-messages";
import { Loader, MoveDown, Send, XCircle } from "lucide-react";
import { Messages } from "./messages";

const ChatMessages = ({ session, filePreview, clearFile, sendMsg, fileSendProgress }) => {
    const { socket } = useSocket();
    const { messages, loading, updateSeen } = useChat();
    const [otherPersonTyping, setOtherPersonTyping] = useState(false);
    const [isScrolledUp] = useState(false);
    const debouncedIsTyping = useDebounce(otherPersonTyping, 500);

    // Receiving typing event
    useEffect(() => {
        if (socket) {
            socket.on(TYPING_EVENT, (data) => {
                setOtherPersonTyping(data.isTyping);
            });

            socket.on("SEEN_MESSAGE_UPDATE", ({ updatedMsg }) => {
                if (updatedMsg) {
                    updateSeen(updatedMsg);
                }
            });
        }
        return () => {
            socket?.off(TYPING_EVENT);
            socket?.off("SEEN_MESSAGE_UPDATE");
        };
    }, [socket, messages, updateSeen]);

    return (
        <div className="relative grow w-full flex flex-col items-start rounded-xl shadow-md h-full max-h-[350px] md:max-h-[570px] bg-primary p-6">
            {loading ? (
                <div className="absolute w-5 h-5 md:w-8 md:h-8 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                    <Loader className="w-full h-full animate-spin text-white" />
                </div>
            ) : (
                <Messages messages={messages} session={session} />
            )}

            {isScrolledUp && (
                <Button size="sm" variant="ghost">
                    <MoveDown className="w-4 h-4" />
                </Button>
            )}

            {filePreview && (
                <div className="absolute bottom-2 left-4 z-20 ">
                    <Image
                        src={filePreview}
                        width={250}
                        height={250}
                        className="object-cover relative aspect-square"
                        alt="selected image"
                    />

                    {fileSendProgress !== 0 && (
                        <div
                            className="z-50 absolute top-1/2 outline 
                                outline-black -translate-x-1/2 left-1/2 
                                -translate-y-1/2 w-40 h-[6px] rounded overflow-hidden"
                        >
                            <div
                                className="h-full bg-black transition-all duration-200"
                                style={{ width: `${fileSendProgress}` }}
                            />
                        </div>
                    )}

                    <button className="absolute top-2 left-2" onClick={clearFile}>
                        <div className="text-white bg-black p-2 rounded-full">
                            <XCircle />
                        </div>
                    </button>
                    <button className="absolute bottom-1 -right-12" onClick={sendMsg}>
                        <div className="text-white bg-black p-2 rounded-sm">
                            <Send />
                        </div>
                    </button>
                </div>
            )}

            {debouncedIsTyping && <TypingEffect />}
        </div>
    );
};

export default memo(ChatMessages);
