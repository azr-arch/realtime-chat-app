"use client";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@lib/socket-events";
import { useEffect, useMemo, useRef, useState } from "react";

import MessageWithDate from "@components/ui/messate-date";
import useDebounce from "@hooks/use-debounce";
import TypingEffect from "@components/ui/typing-status";

const ChatMessages = ({ session }) => {
    const { socket } = useSocket();
    const { messages, loading, setMessages } = useChat();
    const [otherPersonTyping, setOtherPersonTyping] = useState(false);
    const debouncedIsTyping = useDebounce(otherPersonTyping, 500);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    // const updateMessages = (updatedMsg) => {
    //     setMessages((prev) => {
    //         return prev.map((msg) => {
    //             if (msg._id === updatedMsg._id) {
    //                 msg.status = "seen";
    //             }

    //             return msg;
    //         });
    //     });
    // };

    const updateMessages = (updatedMsg) => {
        const newMessages = messages?.map((msg) => {
            if (msg._id === updatedMsg._id) {
                return { ...msg, status: "seen" };
            }
            return msg;
        });
        setMessages(newMessages);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Receiving typing event
    useEffect(() => {
        if (socket) {
            socket.on(TYPING_EVENT, (data) => {
                setOtherPersonTyping(data.isTyping);
            });

            socket.on("SEEN_MESSAGE_UPDATE", ({ updatedMsg }) => {
                if (updatedMsg) {
                    updateMessages(updatedMsg);
                }
            });
        }
        return () => {
            socket?.off(TYPING_EVENT);
            socket?.off("SEEN_MESSAGE_UPDATE");
        };
    }, [socket, messages]);

    return (
        <div className="grow w-full flex flex-col items-start rounded-xl shadow-md h-full max-h-[350px] md:max-h-[570px] bg-primary p-6">
            <div
                style={{ scrollBehavior: "smooth" }}
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

            {debouncedIsTyping && <TypingEffect />}
        </div>
    );
};

export default ChatMessages;
