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
                        className="hidden md:flex items-center gap-2 py-3 px-5 relative self-stretch w-full text-black cursor-pointer  rounded-md"
                    >
                        <Image
                            src={contact?.avatar}
                            width={40}
                            height={40}
                            alt="user-avatar"
                            className="rounded-full w-10 h-10 aspect-square object-cover"
                        />

                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-sm text-black_accent_2 font-medium">
                                {contact?.name}
                            </p>
                        </div>

                        {/* Divider effect */}
                        {idx !== contacts.length - 1 && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[85%] bg-on_white_gray_2" />
                        )}
                    </div>
                ))}
        </>
    );
};

export default ContactList;
