"use client";

import { useChat } from "@context/ChatContext";
import { useEffect, useState } from "react";
import { useSocket } from "@context/SocketContext";
import { useSession } from "next-auth/react";
import ChatHeader from "./ChatHeader";
import MessageInput from "../MessageInput";
import ChatMessages from "./ChatMessages";

import { RECEIVE_MSG_EVENT, TYPING_EVENT } from "@utils/socket-events";

const ChatContainer = () => {
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { currentChat, setMessages } = useChat(); // Data of currentChat
    const { socket } = useSocket();
    const { data: session } = useSession();

    const sendMessage = async () => {
        if (!message) return;
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${currentChat._id}`, {
                // Making request to pages/api Route handler
                method: "POST",
                body: JSON.stringify({
                    users: { senderId, receiverId: receiverId[0] },
                    content: message,
                    status: "pending",
                }),
            });
            const msg = await res.json();

            // setMessages((prev) => [...prev, msg]);
            setMessage("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on(RECEIVE_MSG_EVENT, (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => {
            socket.off(RECEIVE_MSG_EVENT);
        };
    }, [socket]);

    // Emitting typing event
    useEffect(() => {
        if (currentChat && isTyping && socket) {
            console.log("emitting typing event");
            socket.emit(TYPING_EVENT, { chatId: currentChat?._id, isTyping });
        }

        return () => {
            socket?.off(TYPING_EVENT);
        };
    }, [socket, isTyping]);

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
                    <div className="w-full self-stretch grow bg-secondary_bg shadow-md rounded-md flex items-center justify-center ">
                        Select a chat to talk to
                    </div>
                )}
            </>
        </div>
    );
};

export default ChatContainer;
