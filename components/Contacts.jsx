"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ContactHeader from "./ContactHeader";
import ContactList from "./contact-list";
import ChatList from "./ChatList";

const Contacts = () => {
    const { data: session } = useSession();

    const [contacts, setContacts] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getContacts() {
        const url = `/api/fetchContacts`;
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getChats() {
        const url = `/api/fetchAllChats`;
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
            <div
                id="chat-list"
                className="self-stretch w-full grow flex flex-col items-start  md:max-w-contact overflow-y-scroll bg-secondary_bg p-3 gap-3 shadow-md"
            >
                <ChatList chats={chats} session={session} />
                <ContactList contacts={contacts} />
            </div>
        </div>
    );
};

export default Contacts;
