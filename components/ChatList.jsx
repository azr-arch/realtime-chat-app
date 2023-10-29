"use client";

import { useChat } from "@context/ChatContext";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const ChatList = ({ chats, session }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { currentChat, handleSetCurrChat } = useChat();

    function getReceiver(item) {
        const receiver = item.filter((itm) => itm.email !== session?.user.email);
        return receiver[0];
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <>
            <span className="text-xs text-on_white_gray">All</span>

            {chats?.length > 0 &&
                chats?.map((chat) => {
                    const receiver = getReceiver(chat?.participants);

                    // Find if a user isnt in contacts but in chats
                    // then prompt for adding user in contact
                    // const notInContact = !contacts?.some(
                    //     (contact) => contact?._id === receiver?._id
                    // );

                    return (
                        <div
                            key={chat?._id}
                            className={`flex hover:bg-on_white_gray_2 overflow-hidden
                        transition-colors ease-in duration-150
                        ${
                            currentChat && currentChat._id === chat?._id // Active style
                                ? "bg-on_white_gray_2"
                                : ""
                        }
                        items-center gap-3 py-3 px-5 relative self-stretch
                        w-full text-black cursor-pointer  rounded-md`}
                            onClick={() => {
                                if (currentChat && currentChat._id === chat?._id) return;
                                handleSetCurrChat(chat);
                            }}
                        >
                            <Image
                                src={receiver?.avatar}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />

                            <div className="flex flex-col items-start gap-[3px]">
                                <p className="text-sm text-black_accent_2 font-medium">
                                    {receiver?.name}
                                </p>
                                <p className="text-on_white_gray text-xs font-medium">
                                    {chat?.lastMessage?.content}
                                </p>
                            </div>

                            {/* Add a way to detect not in contact chats! */}
                            {/* {notInContact && (
                                <UserPlus className="w-4 h-4 ml-auto text-black dark:text-white" />
                            )} */}
                        </div>
                    );
                })}
        </>
    );
};

export default ChatList;
