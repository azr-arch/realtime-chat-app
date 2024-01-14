"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useChat } from "@context/ChatContext";
import { MoreVertical, Trash, Video, X, VideoOff } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { DeleteModal } from "@components/modals/delete-modal";
import { toast } from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";
import { useSocket } from "@context/SocketContext";
import useActiveList from "@hooks/use-active-list";
import { OnlineStatus } from "@app/_components/online-status";
import { cn } from "@lib/utils";
import Link from "next/link";
import { Button } from "@components/ui/button";
// Helper function

const ChatHeader = ({ selectedChat, currUserEmail }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentChat, handleSetCurrChat, closeChat } = useChat();

    const { socket } = useSocket();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { members } = useActiveList();

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

    const isActive = useMemo(() => {
        return members.includes(receiver?.email);
    }, [members, receiver?.email]);

    const clearParams = useCallback(() => {
        router.push(pathname);
    }, [router, pathname]);

    const startCall = useCallback(() => {
        if (!socket) return;

        socket?.emit("OUTGOING_CALL", {
            from: currUserEmail,
            to: receiver?.email,
            chatId: currentChat?._id,
        });
        console.log("OUTGOING_CALL TO", receiver?.email);
    }, [socket, currUserEmail, receiver, currentChat]);

    const stopCall = useCallback(() => {
        if (!socket) return;

        socket?.emit("CALL_ENDED", { to: receiver?.email });
    }, [socket, receiver]);

    const onVideoCall = useCallback(() => {
        if (searchParams.get("video")) {
            clearParams();
            stopCall();
        } else {
            router.push(`${pathname}?video=true`, { shallow: true });
            startCall();
        }
    }, [searchParams, clearParams, router, pathname, startCall, stopCall]);

    const isVideoCall = Boolean(searchParams.get("video"));

    return (
        <>
            <DeleteModal
                onClose={() => setOpen(false)}
                isOpen={open}
                onConfirm={deleteMessages}
                loading={loading}
            />
            <header className="w-full hidden md:flex self-stretch  items-center gap-4 px-6 py-4 bg-primary rounded-xl max-h-[80px] shadow-sm">
                <div className="relative w-12 h-12 rounded-full">
                    <Image
                        src={receiver?.avatar}
                        fill
                        className="rounded-full overflow-hidden object-cover object-center"
                        alt="user-profile"
                    />
                </div>

                <div className="flex flex-col items-start ">
                    <p className="text-accent_1 font-medium">{receiver?.name}</p>

                    <p
                        className={cn(
                            `text-[10px] text-accent_2 tracking-wide`,
                            isActive && "text-green-400 font-semibold"
                        )}
                    >
                        {isActive ? "Online" : "Offline"}
                    </p>
                </div>

                <div className="flex items-center ml-auto gap-4">
                    <Button
                        variant="outline"
                        onClick={onVideoCall}
                        size="sm"
                        className={cn(isVideoCall ? "bg-red-500 hover:bg-red-700 text-white" : "")}
                    >
                        {isVideoCall ? (
                            <VideoOff className="w-5 h-5" />
                        ) : (
                            <Video className="w-5 h-5" />
                        )}
                    </Button>

                    <div className="cursor-pointer relative flex items-center justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical className="w-5 h-5 text-accent_2" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-12 mt-4 ">
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
                </div>
            </header>
        </>
    );
};

export default ChatHeader;
