"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import useAddContactModal from "@hooks/use-add-modal";

const ContactHeader = ({ handleAddContact }) => {
    const { onOpen } = useAddContactModal();
    return (
        <header className="flex items-center bg-secondary_bg rounded-md px-5 py-3 h-16 justify-between md:max-w-contact w-full shadow-md">
            <p className="text-black_accent_2 text-lg font-medium">Chat</p>

            <button
                onClick={onOpen}
                className="bg-orange p-2  flex items-center justify-center rounded-full text-white"
            >
                <div className="w-4 h-4">+</div>
                {/* <Image src={addIcon} width={30} height={30} alt="add-icon" /> */}
            </button>

            {/* Make this a separate Compo  */}
            {/* <dialog
                className="backdrop:bg-black backdrop:bg-opacity-50 transition-opacity  p-4 rounded-sm shadow-md"
                id="dialog"
                ref={dialogRef}
            >
                <input
                    type="text"
                    placeholder="enter the person's email"
                    className="px-4 py-1 mr-4 text-black"
                    value={addContactInfo}
                    onChange={(e) => setAddContactInfo(e.target.value)}
                />
                <button
                    onClick={(e) => {
                        document.getElementById("dialog").close();
                        handleAddContact(addContactInfo);
                    }}
                    autoFocus
                >
                    Submit
                </button>
            </dialog> */}
        </header>
    );
};

export default ContactHeader;
