"use client";

import { GroupedMessages } from "@components/grouped-messages";
import { useLayoutEffect, useRef } from "react";

export const Messages = ({ messages, session }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        }
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="w-full grow flex flex-col  anchor gap-4 overflow-y-scroll overflow-x-hidden px-2  py-1 relative">
            <GroupedMessages messages={messages} session={session} />
            <div ref={messagesEndRef} />
        </div>
    );
};
