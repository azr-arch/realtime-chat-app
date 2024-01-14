"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./dropdown-menu";
import { Button } from "./button";
import { Smile } from "lucide-react";
const EmojiPicker = ({ onSuccess }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="default" className="bg-black">
                    <Smile className="w-4 h-4 " />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <Picker data={data} onEmojiSelect={onSuccess} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default EmojiPicker;
