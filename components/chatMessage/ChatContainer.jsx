"use client";

import { useChat } from "@context/ChatContext";
import { useEffect, useState } from "react";
import { useSocket } from "@context/SocketContext";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { formatTime } from "@utils/utils";
import moment from "moment/moment";
import ChatHeader from "./ChatHeader";
import MessageInput from "../MessageInput";
import ChatMessages from "./ChatMessages";

const SEND_MSG_EVENT = "send-message";
const RECEIVE_MSG_EVENT = "receive-message";

const ChatContainer = () => {
    // Chat id to fetch corresponding chat me ssages --> ToDo Use context
    // Store all the chat messages in here state
    const { currentChat } = useChat(); // Id of currentChat
    const [messages, setMessages] = useState([]);
    const { socket, isConnected } = useSocket();
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;
        setLoading(true);

        const senderId = session?.user?.sub;
        const receiverId = Object.entries(currentChat)
            .filter(([key, value]) => {
                return key === "_id" && value !== senderId;
            })
            .map(([_, value]) => {
                return value;
            });

        try {
            const res = await fetch(`http://localhost:3000/api/socket/message/${currentChat._id}`, {
                method: "POST",
                body: JSON.stringify({
                    users: { senderId, receiverId: receiverId[0] },
                    content: message,
                }),
            });
            const msg = await res.json();

            setMessages([...messages, msg]);
            setMessage("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        if (currentChat) {
            const fetchData = async () => {
                try {
                    const res = await fetch("api/getMessages", {
                        method: "POST",
                        body: JSON.stringify({ chatId: currentChat._id }),
                    });

                    const { data } = await res.json();
                    // console.log(data);
                    setMessages((prev) => [...data]);
                } catch (error) {
                    // console.log(error);
                }
            };
            fetchData();
        }
    }, [currentChat]);

    useEffect(() => {
        if (!socket) return;

        socket.on(RECEIVE_MSG_EVENT, (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off(RECEIVE_MSG_EVENT);
        };
    }, [socket]);

    return (
        <div className="w-full min-w-[342px] h-full self-stretch flex flex-col items-start gap-2  ">
            <>
                {currentChat ? (
                    <>
                        <ChatHeader
                            selectedChat={currentChat}
                            currUserEmail={session?.user.email}
                        />
                        <ChatMessages messages={messages} session={session} />
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
