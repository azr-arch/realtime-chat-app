"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ContactHeader from "./ContactHeader";
import ContactList from "./contact-list";
import ChatList from "../chat/ChatList";

const Contacts = () => {
    const { data: session } = useSession();

    const [contacts, setContacts] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getContacts() {
        const url = `/api/contacts`;
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getChats() {
        const url = `/api/chats`;
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const helperFetch = async () => {
        const [chatsData, contactsData] = await Promise.all([getChats(), getContacts()]);

        setChats(chatsData?.chats);
        setContacts(contactsData?.contacts);
    };

    useEffect(() => {
        // setLoading(true);
        helperFetch();
        // setLoading(false);
    }, []);

    return (
        <div className="flex flex-col items-start gap-2 self-stretch w-full  md:max-w-contact">
            <ContactHeader currUser={session?.user} />
            {/* Chat and Contact List  */}
            <div className="relative self-stretch w-full grow overflow-hidden">
                {/* For masking effect */}
                <div className="absolute inset-x-0 top-0 h-5 z-50 bg-gradient-to-b from-white to-transparent rounded-t-xl pointer-events-none" />

                <div
                    id="chat-list"
                    className="
                    max-h-[200px] md:max-h-full
                    h-full w-full flex flex-col items-start  
                    md:max-w-contact overflow-y-scroll bg-primary 
                    gap-3 shadow-md rounded-xl"
                >
                    <ChatList chats={chats} session={session} />
                    <ContactList contacts={contacts} />
                    {/* For providing space at bottom  */}
                    <div className="w-full h-[50px]"></div>
                </div>

                {/* For masking effect */}
                <div className="absolute inset-x-0 bottom-0 h-20  bg-gradient-to-t from-white to-transparent rounded-b-xl pointer-events-none" />
            </div>
        </div>
    );
};

export default Contacts;
