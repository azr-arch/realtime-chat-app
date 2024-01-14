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
import { useEdgeStore } from "@lib/edgestore";
import { MediaRoom } from "@app/_components/media-room";
import { useSearchParams } from "next/navigation";

const TYPING_TIMER_LENGTH = 800; // 500ms
let typingTimer;

const ChatContainer = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [fileSendProgress, setFileSendProgress] = useState(0);

    const { currentChat, setMessages, messages, resetUnreadCount, updateSeen } = useChat(); // Data of currentChat
    const { socket } = useSocket();
    const { data: session } = useSession();
    const { edgestore } = useEdgeStore();

    const searchParams = useSearchParams();

    const isTabVisible = useTabActive();

    const sendingMediaMessage = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    setFileSendProgress(progress);
                },
            });
            return res.url;
        }
    };

    const sendMessage = async () => {
        if (!message && !file) return;

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
            let sendMsg = {
                chatId: currentChat?._id,
                users: { senderId, receiverId: receiverId[0] },
                content: message,
                status: "pending",
            };

            if (file) {
                const fileContent = await sendingMediaMessage();
                sendMsg.fileContent = fileContent;
            }

            const sentMsg = await new Promise((resolve, reject) => {
                // Timeout works as waiting period till the acknowledgement is received from server
                // In simple it will wait 30s until throwing an error
                socket.timeout(30000).emit("SEND_MESSAGE", sendMsg, (err, sentMsg) => {
                    if (err) reject(err);
                    else resolve(sentMsg);
                });
            });

            setMessages([...messages, sentMsg]);
            setMessage("");
        } catch (error) {
            console.log(error);
        } finally {
            setFile(null);
            setFilePreview(null);
            setFileSendProgress(0);
            setLoading(false);
        }
    };

    const handleChange = (e, manually = false, manualData) => {
        if (manually) {
            // For adding emojis
            setMessage((prev) => prev + manualData);
        } else {
            setMessage(e.target.value);
        }

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
    }, [messages]);

    const onFileChange = useCallback((e) => {
        setFile(e.target.files[0]);

        const preview = URL.createObjectURL(e.target.files[0]);
        setFilePreview(preview);
    }, []);

    const clearFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isSender = entry.target.getAttribute("data-isSender") === "true";
                    if (entry.isIntersecting && !isSender) {
                        const messageId = entry.target.getAttribute("id").split("-")[1];
                        socket.emit("SEEN_MESSAGE", { messageId, chatId: currentChat?._id });
                        if (currentChat?.unread > 0) {
                            resetUnreadCount(currentChat?._id);
                        }
                        updateSeen({ _id: messageId });
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        memoizedMessages.forEach((msg) => {
            if (msg.status === "seen") return;

            const messageElement = document.getElementById(`message-${msg._id}`);
            if (messageElement && isTabVisible) {
                // Add a data attribute to indicate if the message sender is the current user
                messageElement.setAttribute("data-isSender", msg.sender._id === session?.user?.sub);
                observer.observe(messageElement);
            }
        });

        return () => {
            observer.disconnect();
            socket?.off("SEEN_MESSAGE");
        };
    }, [
        memoizedMessages,
        isTabVisible,
        socket,
        currentChat,
        resetUnreadCount,
        session?.user?.sub,
        updateSeen,
    ]);

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
    }, [socket, currentChat, messages, setMessages]);

    return (
        <div className="w-full min-w-[342px] h-full self-stretch flex flex-col items-start gap-2  ">
            <>
                {currentChat ? (
                    <>
                        <ChatHeader
                            selectedChat={currentChat}
                            currUserEmail={session?.user.email}
                        />

                        {searchParams.has("video") ? (
                            <MediaRoom currUser={session?.user} callId={currentChat._id} />
                        ) : (
                            <ChatMessages
                                session={session}
                                filePreview={filePreview}
                                clearFile={clearFile}
                                sendMsg={sendMessage}
                                fileSendProgress={fileSendProgress}
                            />
                        )}

                        <MessageInput
                            value={message}
                            onChange={handleChange}
                            onSubmit={sendMessage}
                            loading={loading}
                            onFileChange={onFileChange}
                        />
                    </>
                ) : (
                    <div className="w-full self-stretch grow text-accent_1 bg-primary shadow-xl rounded-md flex items-center justify-center ">
                        Select a chat to talk to
                    </div>
                )}
            </>
        </div>
    );
};

export default ChatContainer;
