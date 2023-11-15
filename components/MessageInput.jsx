"use client";

import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import EmojiPicker from "./ui/emoji";

const MessageInput = ({ value, onChange, onSubmit, loading }) => {
    const [isMounted, setIsMounted] = useState(false);
    const inputRef = useRef();

    const handleKeyPress = (e) => {
        if (!value) return;

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

    const addMediaMessage = () => {
        console.log("message");
    };

    const handleEmojiAdd = ({ native }) => {
        onChange({}, true, native);
        inputRef?.current.focus();
    };

    if (!isMounted) return null;

    return (
        <div className="w-full mt-auto flex items-center gap-3 overflow-hidden justify-between rounded-l-lg ">
            <button
                disabled={loading}
                // style={loading && { opacity: 0.4 }}
                onClick={addMediaMessage}
                className={`transition bg-orange rounded-lg ml-auto hover:bg-black hover:text-orange p-4 shadow-md ${
                    loading ? "opacity-60" : ""
                }`}
            >
                <Paperclip className="w-5 h-5" />
                {/* <Picker data={data} onEmojiSelect={console.log} /> */}
            </button>

            <div className="grow h-full flex items-center w-full bg-primary rounded-lg overflow-hidden shadow-md p-1">
                <input
                    type="text"
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyPress}
                    className={`grow h-full w-full px-5 outline-none
                               font-medium text-sm placeholder:opacity-50 bg-transparent
                                 placeholder-black_accent_2 `}
                    placeholder="Write messages..."
                />
                <EmojiPicker onSuccess={handleEmojiAdd} />
            </div>

            <button
                disabled={loading}
                // style={loading && { opacity: 0.4 }}
                onClick={handleSubmit}
                className={`transition bg-orange rounded-lg ml-auto hover:bg-black hover:text-orange p-4 shadow-md ${
                    loading ? "opacity-60" : ""
                }`}
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    );
};

export default MessageInput;
