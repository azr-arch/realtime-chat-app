"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useChat } from "@context/ChatContext";
import { MoreVertical, Trash } from "lucide-react";
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
        <header className="w-full hidden md:flex self-stretch  items-center gap-4 px-6 py-4 bg-primary rounded-xl max-h-[80px] shadow-sm">
            <Image
                src={receiver?.avatar}
                width={25}
                height={25}
                className="rounded-full w-12 h-12 object-cover object-center"
                alt="user-profile"
            />

            <div className="flex flex-col items-start ">
                <p className="text-accent_1 text-base font-medium">{receiver?.name}</p>

                {/* TODO: add status feature */}
                {/* <p className="text-xs text-accent_2  tracking-wide">Offline</p> */}
            </div>

            <div className="ml-auto cursor-pointer relative">
                <DropdownMenu className="">
                    <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-12 mt-4">
                        {/* Complete This */}
                        <DropdownMenuItem className="text-red-500 cursor-pointer">
                            <Trash className="w-4 h-4 mr-2" />
                            Clear chat
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default ChatHeader;
