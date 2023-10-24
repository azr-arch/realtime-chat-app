"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { AddModal } from "./modals/add-modal";
import { Button } from "./ui/button";

const ContactHeader = ({ handleAddContact }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <AddModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => console.log("confirm")}
            />
            <header className="flex items-center bg-secondary_bg rounded-md px-5 py-3 h-16 justify-between md:max-w-contact w-full shadow-md">
                <p className="text-black_accent_2 text-lg font-medium">Chat</p>

                <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="ghost"
                    className="bg-orange rounded-full"
                >
                    Add
                    {/* <Image src={addIcon} width={30} height={30} alt="add-icon" /> */}
                </Button>
            </header>
        </>
    );
};

export default ContactHeader;
