"use client";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@lib/socket-events";
import { useCallback, useEffect, useRef, useState, memo } from "react";

import MessageWithDate from "@components/ui/messate-date";
import useDebounce from "@hooks/use-debounce";
import TypingEffect from "@components/ui/typing-status";
import Image from "next/image";
import { MoveDown, Send, XCircle } from "lucide-react";
import { Button } from "@components/ui/button";

const ChatMessages = ({ session, filePreview, clearFile, sendMsg, fileSendProgress }) => {
    const { socket } = useSocket();
    const { messages, loading, setMessages, updateSeen } = useChat();
    const [otherPersonTyping, setOtherPersonTyping] = useState(false);
    const [isScrolledUp, setIsScrolledUp] = useState(false);
    const debouncedIsTyping = useDebounce(otherPersonTyping, 500);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    // const updateMessages = useCallback(
    //     (updatedMsg) => {
    //         const newMessages = messages?.map((msg) => {
    //             if (msg._id === updatedMsg._id) {
    //                 return { ...msg, status: "seen" };
    //             }
    //             return msg;
    //         });
    //         console.log("setting new message after recieving chat seen update!");
    //         setMessages(newMessages);
    //     },
    //     [messages, setMessages]
    // );

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
            <div
                style={{ scrollBehavior: "smooth" }}
                className="w-full grow flex flex-col gap-3 overflow-y-scroll overflow-x-hidden px-2  py-1 relative"
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
