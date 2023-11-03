"use client";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@lib/socket-events";
import { useEffect, useRef, useState } from "react";

import MessageWithDate from "@components/ui/messate-date";
import useDebounce from "@hooks/use-debounce";

const ChatMessages = ({ session }) => {
    const { socket } = useSocket();
    const { messages, loading } = useChat();
    const [otherPersonTyping, setOtherPersonTyping] = useState(false);
    const debouncedIsTyping = useDebounce(otherPersonTyping, 500);

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
            socket.on(TYPING_EVENT, (data) => {
                // console.log("received typing data from: ", data);
                setOtherPersonTyping(data.isTyping);
            });
        }
        return () => {
            socket?.off(TYPING_EVENT);
        };
    }, []);

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

            {debouncedIsTyping && <p className="text-xs text-black">typing...</p>}
        </div>
    );
};

export default ChatMessages;
