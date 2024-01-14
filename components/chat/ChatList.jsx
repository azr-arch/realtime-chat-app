"use client";

import { OnlineStatus } from "@app/_components/online-status";
import { ChatsContactsSkeleton } from "@components/ui/skeleton-loader";
import { useChat } from "@context/ChatContext";
import useActiveList from "@hooks/use-active-list";
import { UserPlus } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const ChatList = ({ session }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { currentChat, handleSetCurrChat, chats, chatsLoading, loading } = useChat();
    const [filteredChats, setFilteredChats] = useState([]);
    const searchParams = useSearchParams();

    const { members } = useActiveList();

    const getReceiver = useCallback(
        (item) => {
            const receiver = item.filter((itm) => itm.email !== session?.user.email);
            return receiver[0];
        },
        [session?.user.email]
    );

    const isActive = useCallback(
        (email) => {
            return members.includes(email);
        },
        [members]
    );

    useEffect(() => {
        const filterBy = searchParams.get("search")?.toLowerCase();

        if (filterBy) {
            const filtered = chats.filter((chat) => {
                const receiver = getReceiver(chat?.participants);
                return receiver?.email?.toLowerCase().includes(filterBy);
            });
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    }, [chats, searchParams, getReceiver]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <>
            <span className="text-xs text-heading ml-6 mt-4">All</span>

            {/* Skeleton loading */}
            {chatsLoading && (
                <ChatsContactsSkeleton
                    count={7}
                    className={"grow min-h-[65px] h-[65px] gap-3 py-3"}
                />
            )}

            {filteredChats?.length > 0 &&
                filteredChats?.map((chat, idx) => {
                    const receiver = getReceiver(chat?.participants);

                    // TODO: Find if a user isnt in contacts but in chats
                    // then prompt for adding user in contact
                    // const notInContact = !contacts?.some(
                    //     (contact) => contact?._id === receiver?._id
                    // );

                    return (
                        <div
                            key={chat?._id}
                            className={`flex relative hover:bg-white/10 overflow-hidden
                        transition-colors ease-in duration-150 min-h-[65px]
                        ${
                            currentChat && currentChat._id === chat?._id // Active style
                                ? "bg-white/10"
                                : ""
                        }
                        ${
                            loading ? "opacity-50  pointer-events-none" : "" // Disable style
                        }
                        items-center gap-3 py-3 relative self-stretch
                        w-full cursor-pointer `}
                            onClick={() => {
                                if (currentChat && currentChat._id === chat?._id) return;
                                handleSetCurrChat(chat);
                            }}
                        >
                            <div className="w-11 h-11 rounded-full relative ml-6 ">
                                <Image
                                    fill
                                    src={receiver?.avatar}
                                    className="object-cover rounded-full overflow-hidden"
                                    alt="user profile"
                                />

                                {/* Active status */}
                                {isActive(receiver?.email) && <OnlineStatus />}
                            </div>
                            {/* Last message time */}
                            <p className="text-[10px] tracking-wide absolute top-2 font-bold right-4 text-accent_2">
                                {moment(chat?.updatedAt).format("HH:mm A")}
                            </p>
                            {/* Unread count */}
                            {chat?.unread > 0 &&
                                chat?.lastMessage?.sender?.email !== session?.user?.email && (
                                    <span
                                        className="absolute top-1/2 -translate-y-1/2 
                                                    flex items-center justify-center w-4 h-4 
                                                    rounded-full right-4 text-[10px] 
                                                    font-bold bg-orange text-black"
                                    >
                                        {chat?.unread}
                                    </span>
                                )}
                            <div className="flex flex-col items-start gap-[3px] truncate">
                                <p className="text-sm text-accent_1 font-medium">
                                    {receiver?.name}
                                </p>
                                {currentChat?._id !== chat?._id && (
                                    <p
                                        className={`text-accent_2 text-xs truncate w-full ${
                                            chat?.unread > 0 ? "font-extrabold" : "font-medium"
                                        }`}
                                    >
                                        {chat?.lastMessage?.content}
                                    </p>
                                )}
                            </div>
                            {/* Add a way to detect not in contact chats! */}
                            {/* {notInContact && (
                                <button className="ml-auto mr-5 text-black dark:text-white p-2  rounded-full bg-white/90">
                                    <UserPlus className="w-4 h-4 " />
                                </button>
                            )} */}
                        </div>
                    );
                })}
        </>
    );
};

export default ChatList;
