"use client";

import { useChat } from "@context/ChatContext";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSocket } from "@context/SocketContext";
import { useSession } from "next-auth/react";
import ChatHeader from "./ChatHeader";
import MessageInput from "../MessageInput";
import ChatMessages from "./ChatMessages";

import { RECEIVE_MSG_EVENT, TYPING_EVENT } from "@lib/socket-events";
import useTabActive from "@hooks/useTabActive";

const TYPING_TIMER_LENGTH = 800; // 500ms
let typingTimer;

const ChatContainer = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { currentChat, setMessages, messages, resetUnreadCount } = useChat(); // Data of currentChat
    const { socket } = useSocket();
    const { data: session } = useSession();

    const isTabVisible = useTabActive();

    const sendMessage = async () => {
        if (!message) return;

        // This is part is responsible if user is typing and in less 500ms user sends the message
        // Then the UI on other user may not be cleared of `typing`. hence this
        socket.emit(TYPING_EVENT, { chat: currentChat, isTyping: false });

        setLoading(true);

        // TODD: refactor this part
        const senderId = session?.user?.sub;
        const receiverId = Object.entries(currentChat)
            .filter(([key, value]) => {
                return key === "_id" && value !== senderId;
            })
            .map(([_, value]) => {
                return value;
            });

        try {
            const sendMsg = {
                chatId: currentChat?._id,
                users: { senderId, receiverId: receiverId[0] },
                content: message,
                status: "pending",
            };

            const sentMsg = await new Promise((resolve, reject) => {
                // Timeout works as waiting period till the acknowledgement is received from server
                // In simple it will wait 30s until throwing an error
                socket.timeout(30000).emit("SEND_MESSAGE", sendMsg, (err, sentMsg) => {
                    if (err) reject(err);
                    else resolve(sentMsg);
                });
            });

            // setMessages((prev) => [...prev, sentMsg]);
            setMessages([...messages, sentMsg]);
            setMessage("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);

        if (!isTyping) {
            setIsTyping(true);
            socket.emit(TYPING_EVENT, { chat: currentChat, isTyping: true });
        }

        // Clearing timeout to prevent long queues in event loop!
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            setIsTyping(false);
            socket.emit(TYPING_EVENT, { chat: currentChat, isTyping: false });
        }, TYPING_TIMER_LENGTH);
    };

    const memoizedMessages = useMemo(() => {
        return messages;
    }, [currentChat, messages]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.getAttribute("id").split("-")[1];
                        socket.emit("SEEN_MESSAGE", { messageId, chatId: currentChat?._id });
                        console.log("seen message", currentChat, messageId);
                        if (currentChat?.unread > 0) {
                            console.log("Resetting unread for: ", currentChat);
                            resetUnreadCount(currentChat?._id);
                        }
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        memoizedMessages.forEach((msg) => {
            if (msg.status === "seen" || msg.sender._id === session?.user?.sub) return;

            const messageElement = document.getElementById(`message-${msg._id}`);
            if (messageElement && isTabVisible) {
                observer.observe(messageElement);
                // Set the message status to seen
                msg.status = "seen";
            }
        });

        return () => {
            observer.disconnect();
            socket?.off("SEEN_MESSAGE");
        };
    }, [memoizedMessages, isTabVisible]);

    useEffect(() => {
        if (!socket) return;

        socket.on(RECEIVE_MSG_EVENT, (msg) => {
            if (msg.chat === currentChat?._id) {
                // setMessages((prev) => [...prev, msg]);
                setMessages([...messages, msg]);
            }
        });
        return () => {
            socket?.off(RECEIVE_MSG_EVENT);
        };
    }, [socket, currentChat, messages]);

    return (
        <div className="w-full min-w-[342px] h-full self-stretch flex flex-col items-start gap-2  ">
            <>
                {currentChat ? (
                    <>
                        <ChatHeader
                            selectedChat={currentChat}
                            currUserEmail={session?.user.email}
                        />
                        <ChatMessages session={session} />
                        <MessageInput
                            value={message}
                            onChange={handleChange}
                            onSubmit={sendMessage}
                            loading={loading}
                        />
                    </>
                ) : (
                    <div className="w-full self-stretch grow bg-primary shadow-xl rounded-md flex items-center justify-center ">
                        Select a chat to talk to
                    </div>
                )}
            </>
        </div>
    );
};

export default ChatContainer;
