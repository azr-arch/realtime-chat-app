"use client";

import { useChat } from "@context/ChatContext";
import { useEffect, useState } from "react";

const ContactList = ({ contacts }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { getChat } = useChat();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <p className="font-medium text-lg mt-4 hidden md:block">Contacts</p>

            {contacts?.length > 0 &&
                contacts.map((contact) => (
                    <div
                        key={contact?._id}
                        onClick={() => getChat(contact?._id)}
                        className="hidden md:flex items-center gap-2 py-3 px-5 relative self-stretch w-full text-black cursor-pointer  rounded-md"
                    >
                        <img
                            src={contact?.avatar}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />

                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-sm text-black_accent_2 font-medium">
                                {contact?.name}
                            </p>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default ContactList;
