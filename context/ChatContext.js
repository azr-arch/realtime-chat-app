"use client";

import { createContext, useContext, useState } from "react";
import { useSocket } from "../context/SocketContext";

const ChatContext = createContext({
    // deleteMessage: () => undefined,
    // addMessage: () => undefined,
    // updateMessage: () => undefined,
    // createChat: () => undefined,
    // removeMessage: () => undefined,
});

const ChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState("");
    const [loading, setLoading] = useState(false);

    const resetUnreadCount = async (id) => {
        const res = await fetch(`http://localhost:3000/api/socket/message/${id}/resetUnreadCount`, {
            method: "POST",
        });
        return await res.json();
    };

    const handleSetCurrChat = async (data) => {
        setLoading(true);
        setCurrentChat(data);

        // reset the unread count
        // const updatedChat = await resetUnreadCount(data?._id);

        // setCurrentChat(updatedChat);
        setLoading(false);
    };

    const getChat = async (receiverId) => {
        try {
            const res = await fetch("api/getChat", {
                method: "POST",
                body: JSON.stringify({ receiverId }),
            });

            const { data } = await res.json(); // toDo store it in localstorage
            handleSetCurrChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ChatContext.Provider
            value={{ currentChat, handleSetCurrChat, loading, getChat, resetUnreadCount }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
