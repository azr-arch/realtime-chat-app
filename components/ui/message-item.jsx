import moment from "moment";
import { Check, CheckCheck } from "lucide-react";
import Image from "next/image";
import ContextMenuWrapper from "./context-menu-wrapper";
import { DateBadge } from "@components/date-badge";

export const MessageItem = ({ msg, session }) => {
    const isSender = session?.user?.sub === msg?.sender?._id;

    return (
        <>
            {msg?.isNewDay && <DateBadge time={msg?.updatedAt} />}

            {/* Message */}
            <div
                id={`message-${msg?._id}`}
                className={`flex flex-col items-start  max-w-[80%] gap-1 relative ${
                    isSender ? "self-end items-end" : "self-start items-start"
                }`}
            >
                {msg?.document && (
                    <ContextMenuWrapper src={msg?.document}>
                        <Image
                            src={msg?.document}
                            width={200}
                            height={200}
                            className="w-[200px] h-[200px] aspect-square object-cover rounded-xl cursor-pointer shadow-sm"
                            alt="msg"
                        />
                    </ContextMenuWrapper>
                )}

                {msg?.content && (
                    <div
                        data-sender={isSender ? "self" : "other"}
                        className={`w-fit ${
                            isSender
                                ? "text-black bg-orange   "
                                : "self-start items-start  text-white bg-black"
                        } flex flex-col text-sm font-semibold rounded-sm py-2 px-4 break-all`}
                    >
                        <p>{msg?.content}</p>
                    </div>
                )}

                <div className="flex items-center space-x-2 mt-[2px] text-[10px]">
                    <time className=" text-on_white_gray font-semibold ">
                        {moment(msg?.updatedAt).format("HH:mm A")}
                    </time>
                    {isSender && (
                        <p className="text-black text-sm font-medium">
                            {msg?.status === "sent" ? (
                                <Check className="w-3 h-3 text-accent_1" />
                            ) : (
                                <CheckCheck className="w-3 h-3 text-accent_1" />
                            )}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
