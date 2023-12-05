"use client";

import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useSocket } from "../context/SocketContext";

import { initialState, chatReducer } from "@components/reducers/chat-reducer";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
    const { socket } = useSocket();
    const [state, dispatch] = useReducer(chatReducer, initialState);

    const setChats = (newChats) => {
        dispatch({ type: "SET_CHATS", payload: newChats });
    };

    const setMessages = (newMessages) => {
        dispatch({ type: "SET_MESSAGES", payload: newMessages });
    };

    const setContacts = (newContacts) => {
        dispatch({ type: "SET_CONTACTS", payload: newContacts });
    };

    // This one is for closing the chat
    const closeChat = () => {
        dispatch({ type: "SET_CURRENT_CHAT", payload: null });
    };

    // This setter helps in clearing out of unread messages when a chat is clicked
    const handleSetCurrChat = async (data) => {
        if (socket) {
            console.log("emitting join event from socekt");
            socket.emit("JOIN", { data });
        }

        const newChat = { ...data, unread: 0 };
        dispatch({ type: "SET_CURRENT_CHAT", payload: newChat }); // Optimistically set the unread to 0
        if (data?.unread > 0) {
            // Reset in background
            resetUnreadCount(data?._id).then(({ chat }) => {
                if (chat) {
                    // Update the chat
                    dispatch({ type: "SET_CURRENT_CHAT", payload: chat });
                    const newChats = updateChatList(state.chats, chat);
                    if (newChats !== null) {
                        dispatch({ type: "SET_CHATS", payload: newChats });
                    }
                }
            });
        }
    };

    const getChat = async (receiverId) => {
        try {
            const res = await fetch("api/getChat", {
                method: "POST",
                body: JSON.stringify({ receiverId }),
            });

            const { data } = await res.json();
            handleSetCurrChat(data[0]);
            const newChats = [...state.chats, data[0]];
            dispatch({ type: "SET_CHATS", payload: newChats });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages = useCallback(async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await fetch(`api/chats/${state.currentChat._id}/messages`);
            const { data } = await res.json();
            dispatch({ type: "SET_MESSAGES", payload: [...data] });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }, [state?.currentChat?._id]);

    async function getData(url) {
        if (!url) return;
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function resetUnreadCount(id) {
        const res = await fetch(`api/resetUnread/${id}`, {
            method: "POST",
        });
        return await res.json();
    }

    const getDataHelper = useCallback(async () => {
        dispatch({ type: "SET_CHATS_LOADING", payload: true });

        // const [chatsData, contactsData] = await Promise.all([
        //     getData("api/chats"),
        //     getData("api/contacts"),
        // ]);
        const chatsData = await getData("api/chats");
        const contactsData = await getData("api/contacts");

        dispatch({ type: "SET_CHATS", payload: chatsData?.chats });
        dispatch({ type: "SET_CONTACTS", payload: contactsData?.contacts });
        dispatch({ type: "SET_CHATS_LOADING", payload: false });
    }, []);

    const updateSeen = (updateMsg) => {
        dispatch({ type: "UPDATE_SEEN", payload: updateMsg });
    };

    useEffect(() => {
        if (state.currentChat) {
            fetchMessages();
        }
    }, [state.currentChat, fetchMessages]);

    useEffect(() => {
        getDataHelper();
    }, [getDataHelper]);

    useEffect(() => {
        if (socket) {
            socket.on("CHAT_UPDATE", (updatedChat) => {
                console.log("chat update event");
                if (state.currentChat?._id === updatedChat?._id) {
                    if (updatedChat.unread > 0) {
                        resetUnreadCount(updatedChat._id);
                        updatedChat.unread = 0;
                    }
                }

                const newChats = updateChatList(state.chats, updatedChat);
                if (newChats !== null) {
                    dispatch({ type: "SET_CHATS", payload: newChats });
                }
            });
        }

        return () => {
            socket?.off("CHAT_UPDATE");
        };
    }, [socket, state.chats, state.currentChat]);

    return (
        <ChatContext.Provider
            value={{
                currentChat: state.currentChat,
                contacts: state.contacts,
                messages: state.messages,
                loading: state.loading,
                chatsLoading: state.chatsLoading,
                chats: state.chats,
                handleSetCurrChat,
                resetUnreadCount,
                setMessages,
                setContacts,
                updateSeen,
                closeChat,
                setChats,
                getChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => useContext(ChatContext);

function updateChatList(chats, updatedChat) {
    // Find the index of the chat in the chat list
    const index = chats.findIndex((chat) => chat._id === updatedChat._id);

    if (index !== -1 && JSON.stringify(chats[index]) !== JSON.stringify(updatedChat)) {
        // Replace the old chat with the updated chat
        const newChats = [...chats];
        newChats[index] = updatedChat;
        return newChats;
    }

    // If the chat was not found in the chat list or the chat data hasn't changed,
    // return null hinting that none was changed
    return null;
}

export { ChatProvider, useChat };
