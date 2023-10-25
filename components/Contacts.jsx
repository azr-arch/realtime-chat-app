"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChat } from "@context/ChatContext";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { Router } from "next/router";
import { useSocket } from "@context/SocketContext";
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import ChatContainer from "./chatMessage/ChatContainer";

import { toast } from "react-hot-toast";

const Contacts = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    const [contacts, setContacts] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const { handleSetCurrChat } = useChat();
    const { socket } = useSocket();

    const getChats = async (receiverId) => {
        try {
            const res = await fetch("api/fetchAllChats");
            const { data } = await res.json();
            setChats((prev) => [...data]);
        } catch (error) {
            console.log(error);
        }
    };

    const getChat = async (receiverId) => {
        try {
            const res = await fetch("api/getChat", {
                method: "POST",
                body: JSON.stringify({ currUserId: session.user.sub, receiverId }),
            });

            const { data } = await res.json(); // toDo store it in localstorage
            handleSetCurrChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        // if (session?.user?.email) {
        const fetchContacts = async () => {
            const res = await fetch("api/fetchContacts");

            if (!res.ok) {
                // console.log("error occurred ", res);
                return;
            }
            const { data } = await res.json();
            setContacts([...data.contacts]);
        };
        fetchContacts();
        getChats();

        setLoading(false);
        // }
    }, []);

    if (status === "unauthenticated") return redirect("/");
    return (
        <div className="flex flex-col items-start gap-2 self-stretch w-full  md:max-w-contact">
            <ContactHeader currUser={session?.user} />
            {/* Chat or Contact List  */}
            <ChatList
                chats={chats}
                session={session}
                contacts={contacts}
                getChat={getChat}
                loading={loading}
            />
        </div>
    );
};

export default Contacts;
