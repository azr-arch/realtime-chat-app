"use client";

import { useChat } from "@context/ChatContext";
import { UserPlus } from "lucide-react";
import moment from "moment";
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
            <span className="text-xs text-on_white_gray ml-6 mt-4">All</span>

            {chats?.length > 0 &&
                chats?.map((chat, idx) => {
                    const receiver = getReceiver(chat?.participants);

                    // Find if a user isnt in contacts but in chats
                    // then prompt for adding user in contact
                    // const notInContact = !contacts?.some(
                    //     (contact) => contact?._id === receiver?._id
                    // );

                    return (
                        <div
                            key={chat?._id}
                            className={`flex relative hover:bg-on_white_gray_2 overflow-hidden
                        transition-colors ease-in duration-150 min-h-[65px]
                        ${
                            currentChat && currentChat._id === chat?._id // Active style
                                ? "bg-on_white_gray_2"
                                : ""
                        }
                        items-center gap-3 py-3 relative self-stretch
                        w-full cursor-pointer `}
                            onClick={() => {
                                if (currentChat && currentChat._id === chat?._id) return;
                                handleSetCurrChat(chat);
                            }}
                        >
                            <Image
                                src={receiver?.avatar}
                                width={45}
                                height={45}
                                className="rounded-full aspect-square w-11 h-11 object-cover ml-6 "
                                alt="user profile"
                            />

                            {/* Last message time */}
                            <p className="text-[10px] tracking-wide absolute top-2 font-medium right-4 text-accent_2">
                                {moment(chat?.updatedAt).format("HH:mm A")}
                            </p>
                            <div className="flex flex-col items-start gap-[3px] truncate">
                                <p className="text-sm text-accent_1 font-medium">
                                    {receiver?.name}
                                </p>
                                <p className="text-accent_2 text-xs font-medium truncate w-full">
                                    {chat?.lastMessage?.content}
                                </p>
                            </div>

                            {/* Add a way to detect not in contact chats! */}
                            {/* {notInContact && (
                                <button className="ml-auto mr-5 text-black dark:text-white p-2  rounded-full bg-white/90">
                                    <UserPlus className="w-4 h-4 " />
                                </button>
                            )} */}

                            {/* Divider effect */}
                            {idx !== chats.length - 1 && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[85%] bg-on_white_gray_2" />
                            )}
                        </div>
                    );
                })}
        </>
    );
};

export default ChatList;
