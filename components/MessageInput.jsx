"use client";

import { useChat } from "@context/ChatContext";
import { useSocket } from "@context/SocketContext";
import { TYPING_EVENT } from "@utils/socket-events";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const MessageInput = ({ value, onChange, onSubmit, loading }) => {
    const [isMounted, setIsMounted] = useState(false);
    // const [isTyping, setIsTyping] = useState(false);

    // const { socket } = useSocket();
    // const { currentChat } = useChat();

    // Create a debounced function for setting isTyping to false
    // let timeoutId = null;

    const handleKeyPress = (e) => {
        if (!value) return;

        // setIsTyping(true);

        // Clear the previous timeout if there is one
        // if (timeoutId) {
        //     clearTimeout(timeoutId);
        // }

        // Set a new timeout to set isTyping to false after 2 seconds
        // timeoutId = setTimeout(() => {
        //     setIsTyping(false);
        // }, 2000);

        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value) return;
        onSubmit();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="w-full mt-auto flex items-center gap-3 overflow-hidden justify-between rounded-l-lg ">
            <div className="grow h-full  bg-secondary_bg rounded-r-lg overflow-hidden ">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyPress}
                    className={`grow h-full w-full px-5 outline-none
                                 py-4 font-medium text-sm placeholder:opacity-50 
                                 placeholder-black_accent_2`}
                    placeholder="Write messages..."
                />
            </div>

            <button
                disabled={loading}
                // style={loading && { opacity: 0.4 }}
                onClick={handleSubmit}
                className={`bg-orange rounded-lg ml-auto hover:text-white p-4 shadow-md ${
                    loading ? "opacity-60" : ""
                }`}
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    );
};

export default MessageInput;
