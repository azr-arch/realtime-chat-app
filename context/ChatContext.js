"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
    const [messages, setMessages] = useState([]);
    // const [contacts, setContacts] = useState([])

    const resetUnreadCount = async (id) => {
        const res = await fetch(`http://localhost:3000/api/socket/message/${id}/resetUnreadCount`, {
            method: "POST",
        });
        return await res.json();
    };

    const handleSetCurrChat = async (data) => {
        // setLoading(true);
        setCurrentChat(data);
        // setLoading(false);
    };

    const getChat = async (receiverId) => {
        try {
            const res = await fetch("api/getChat", {
                method: "POST",
                body: JSON.stringify({ receiverId }),
            });

            const { data } = await res.json(); // toDo store it in localstorage
            handleSetCurrChat(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`api/chats/${currentChat._id}/messages`);
            console.log("res: ", res);
            const { data } = await res.json();
            setMessages([...data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentChat) {
            fetchMessages();
        }
    }, [currentChat]);

    return (
        <ChatContext.Provider
            value={{
                currentChat,
                handleSetCurrChat,
                loading,
                getChat,
                resetUnreadCount,
                messages,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
