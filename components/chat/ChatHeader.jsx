"use client";

import { useChat } from "@context/ChatContext";
import Image from "next/image";

const ChatHeader = ({ selectedChat, currUserEmail }) => {
    function getReceiver(item) {
        if (item) {
            const receiver = item?.filter((itm) => itm.email !== currUserEmail);
            return receiver[0];
        }
        return null;
    }

    const receiver = getReceiver(selectedChat?.participants);
    return (
        <header className="w-full sm:hidden md:flex self-stretch  items-center gap-4 px-6 py-4 bg-primary rounded-xl shadow-sm">
            <Image
                src={receiver?.avatar}
                width={45}
                height={45}
                className="rounded-full "
                // alt="user-profile"
            />

            <div className="flex flex-col items-start ">
                <p className="text-accent_1 text-base font-medium">{receiver?.name}</p>
                <p className="text-xs text-accent_2  tracking-wide">Offline</p>
            </div>
        </header>
    );
};

export default ChatHeader;
