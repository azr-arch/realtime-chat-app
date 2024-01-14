"use client";

import { useChat } from "@context/ChatContext";
import Image from "next/image";

const ContactList = () => {
    const { getChat, contacts } = useChat();
    return (
        <>
            {/*       <span className="text-xs text-on_white_gray ml-6 mt-4">All</span> */}
            <p className="font-medium text-md text-on_white_gray ml-6 mt-4 hidden md:block">
                Contacts
            </p>

            {contacts?.length > 0 &&
                contacts.map((contact, idx) => (
                    <div
                        key={contact?._id}
                        onClick={() => getChat(contact?._id)}
                        className="hidden md:flex items-center gap-3 hover:bg-white/10 transition-colors py-3 px-5 relative self-stretch w-full  cursor-pointer  rounded-md"
                    >
                        <div className="w-11 h-11 rounded-full relative overflow-hidden">
                            <Image
                                fill
                                src={contact?.avatar}
                                alt="user-avatar"
                                className="object-cover overflow-hidden"
                            />
                        </div>

                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-sm text-accent_1 font-medium">{contact?.name}</p>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default ContactList;
