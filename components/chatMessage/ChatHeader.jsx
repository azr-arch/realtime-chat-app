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
        <header className="w-full sm:hidden md:flex self-stretch  items-center gap-2 px-6 py-3 bg-secondary_bg rounded-md shadow-md">
            <img
                src={receiver?.avatar}
                width={45}
                height={45}
                className="rounded-full p-1"
                // alt="user-profile"
            />

            <div className="flex flex-col items-start gap-2">
                <p className="text-black_accent_2 text-lg  font-medium">{receiver?.name}</p>
            </div>
        </header>
    );
};

export default ChatHeader;
