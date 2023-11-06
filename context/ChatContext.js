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
    const [chats, setChats] = useState([]);
    const [contacts, setContacts] = useState([]);
    const { socket } = useSocket();
    // const [contacts, setContacts] = useState([])

    const resetUnreadCount = async (id) => {
        const res = await fetch(`http://localhost:3000/api/socket/message/${id}/resetUnreadCount`, {
            method: "POST",
        });
        return await res.json();
    };

    const handleSetCurrChat = async (data) => {
        if (socket) {
            console.log("emitting join event from socekt");
            socket.emit("JOIN", { data });
        }
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

            const { data } = await res.json();
            handleSetCurrChat(data[0]);
            setChats((prev) => [...prev, data[0]]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`api/chats/${currentChat._id}/messages`);
            const { data } = await res.json();
            setMessages([...data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function getData(url) {
        if (!url) return;
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        if (currentChat) {
            fetchMessages();
        }
    }, [currentChat]);

    useEffect(() => {
        (async () => {
            const [chatsData, contactsData] = await Promise.all([
                getData("/api/chats"),
                getData("/api/contacts"),
            ]);

            setChats(chatsData?.chats);
            setContacts(contactsData?.contacts);
        })();
    }, []);

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
                contacts,
                chats,
                setContacts,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
