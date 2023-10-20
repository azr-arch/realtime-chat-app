"use client";
import moment from "moment";
import { useEffect, useRef } from "react";

const ChatMessages = ({ messages, session }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="grow w-full  flex flex-col items-start  rounded-lg shadow-md h-full max-h-[415px] md:max-h-[550px] bg-secondary_bg p-6">
            <div
                className="w-full grow flex flex-col gap-3 overflow-y-scroll px-2 shadow-inner"
                ref={messagesEndRef}
            >
                {messages?.map((msg, idx) => {
                    return (
                        <div
                            key={idx}
                            className={`flex flex-col items-start gap-1 ${
                                msg?.sender?._id?.toString() === session?.user?.sub
                                    ? "self-start items-start"
                                    : "self-end items-end"
                            }`}
                        >
                            <div
                                key={idx}
                                data-sender={
                                    msg?.sender?._id?.toString() === session?.user?.sub
                                        ? "self"
                                        : "other"
                                }
                                className={`w-fit ${
                                    msg?.sender?._id?.toString() === session?.user?.sub
                                        ? " text-black_accent_2 bg-on_white_gray_2 "
                                        : "self-end items-end text-white bg-orange"
                                } flex flex-col text-sm font-medium  rounded-sm py-2 px-4`}
                            >
                                <p>{msg?.content}</p>
                            </div>

                            <time className="text-[10px] px-2 text-on_white_gray font-semibold mt-[2px]">
                                {moment(msg?.updatedAt).format("HH:mm A")}
                            </time>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatMessages;
