"use client";

import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import EmojiPicker from "./ui/emoji";
import { useSearchParams } from "next/navigation";

const MessageInput = ({ value, onChange, onSubmit, loading, onFileChange }) => {
    const inputRef = useRef();
    const searchParams = useSearchParams();

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

    // const addMediaMessage = () => {
    //     console.log("message");
    // };

    const handleEmojiAdd = ({ native }) => {
        onChange({}, true, native);
        inputRef?.current.focus();
    };

    const isVideoCall = Boolean(searchParams.get("video"));

    useEffect(() => {
        if (!loading) {
            inputRef?.current?.focus();
        }
    }, [loading]);

    return (
        <div className="w-full mt-auto flex items-center gap-3 overflow-hidden justify-between rounded-l-lg ">
            <label
                htmlFor="media-message"
                className={`transition bg-black rounded-lg ml-auto hover:bg-black/50 hover:text-accent_2 text-accent_1 p-4 shadow-md ${
                    loading ? "opacity-60" : ""
                }`}
            >
                <input
                    type="file"
                    name="media-message"
                    id="media-message"
                    hidden
                    onChange={onFileChange}
                    disabled={isVideoCall}
                />
                <Paperclip className="w-3 h-3 sm:w-5 sm:h-5 " />
            </label>

            <div className="grow h-full flex items-center w-full bg-primary rounded-lg overflow-hidden shadow-md px-1">
                <input
                    type="text"
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyPress}
                    className={`grow h-full w-full px-5 outline-none
                               font-medium text-sm  bg-transparent placeholder:opacity-70
                                placeholder:placeholder-accent-foreground text-accent_1 focus-visible:ring-0`}
                    placeholder="Hey there!"
                    disabled={loading || isVideoCall}
                />
                <EmojiPicker onSuccess={handleEmojiAdd} />
            </div>

            <button
                disabled={loading || value === "" || isVideoCall}
                onClick={handleSubmit}
                className={`transition bg-black rounded-lg ml-auto hover:bg-black/50 hover:text-accent_2 text-accent_1 p-4 shadow-md ${
                    loading ? "opacity-60" : ""
                }`}
            >
                <Send className="w-3 h-3 sm:w-5 sm:h-5" />
            </button>
        </div>
    );
};

export default MessageInput;
