"use client";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@lib/socket-events";
import { useEffect, useRef } from "react";

import MessageWithDate from "@components/ui/messate-date";

const ChatMessages = ({ session }) => {
    const { socket } = useSocket();
    const { messages, loading } = useChat();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Receiving typing event
    useEffect(() => {
        if (socket) {
            console.log("receiving typing event");
            socket.on("recieve", (data) => {
                console.log("typing status ", data);

                // // Remove typing status after 2 seconds
                // setTimeout(() => {
                //     setIsTyping(false);
                // }, 2000);
            });
        }
        return () => {
            socket?.off(TYPING_EVENT);
        };
    }, [socket]);

    return (
        <div className="grow w-full flex flex-col items-start rounded-xl shadow-md h-full max-h-[415px] md:max-h-[570px] bg-primary p-6">
            <div
                className="w-full grow flex flex-col gap-3 overflow-y-scroll px-2  py-1 relative"
                ref={messagesEndRef}
            >
                {loading ? (
                    <p className="absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        Fetching chats...
                    </p>
                ) : (
                    messages?.map((msg, idx) => {
                        return (
                            <MessageWithDate
                                key={msg?._id | idx}
                                msg={msg}
                                prevMsg={messages[idx - 1]}
                                session={session}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatMessages;
