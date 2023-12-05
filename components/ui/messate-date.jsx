import { memo } from "react";
import moment from "moment";
import { Badge } from "./badge";
import { Check, CheckCheck } from "lucide-react";
import Image from "next/image";
import ContextMenuWrapper from "./context-menu-wrapper";

const MessageWithDate = ({ msg, prevMsg, session }) => {
    const msgDate = moment(msg?.updatedAt);
    const prevMsgDate = prevMsg ? moment(prevMsg?.updatedAt) : null;
    const shouldDisplayDate = !prevMsgDate || !msgDate.isSame(prevMsgDate, "day");

    const isSender = session?.user?.sub === msg?.sender?._id;
    return (
        <>
            {shouldDisplayDate && (
                <Badge
                    variant="outline"
                    className="w-fit self-center rounded-2xl text-[10px] text-accent_1 font-medium px-3 outline-on_white_gray_2 outline outline-[1px] py-2 my-2"
                >
                    {msgDate.calendar(null, {
                        sameDay: "[Today]",
                        lastDay: "[Yesterday]",
                        lastWeek: "dddd",
                        sameElse: "D MMMM, YYYY",
                    })}
                </Badge>
            )}

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
                                ? "text-white bg-orange   "
                                : "self-start items-start  text-message bg-on_white_gray_2"
                        } flex flex-col text-sm font-medium rounded-sm py-2 px-4 break-all`}
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

export default MessageWithDate;
