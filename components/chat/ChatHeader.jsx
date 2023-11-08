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
import { MoreVertical, Trash, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DeleteModal } from "@components/modals/delete-modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// Helper function

const ChatHeader = ({ selectedChat, currUserEmail }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentChat, handleSetCurrChat, closeChat } = useChat();
    const router = useRouter();

    const deleteMessages = async () => {
        try {
            setLoading(true);

            const res = await fetch(`api/chats/${currentChat?._id}/messages`, {
                method: "DELETE",
            });

            const { newChat } = await res.json();
            console.log(newChat);
            handleSetCurrChat(newChat);

            toast.success("Chat cleared!");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Please try again later.");
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    const getReceiver = (item) => {
        if (item) {
            const receiver = item?.filter((itm) => itm.email !== currUserEmail);
            return receiver[0];
        }
        return null;
    };

    const receiver = getReceiver(selectedChat?.participants);
    return (
        <>
            <DeleteModal
                onClose={() => setOpen(false)}
                isOpen={open}
                onConfirm={deleteMessages}
                loading={loading}
            />
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

                    {/* TODO: Add status feature */}
                    {/* <p className="text-xs text-accent_2  tracking-wide">Offline</p> */}
                </div>

                <div className="ml-auto cursor-pointer relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-12 mt-4">
                            <DropdownMenuItem
                                onClick={() => setOpen(true)}
                                className="text-red-500 cursor-pointer"
                            >
                                <Trash className="w-4 h-4 mr-2" />
                                Clear Chat
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={closeChat} className="cursor-pointer">
                                <X className="w-4 h-4 mr-2" />
                                Close Chat
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    );
};

export default ChatHeader;
