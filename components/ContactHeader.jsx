"use client";

import addIcon from "@styles/assets/add.svg";
import Image from "next/image";
import { useState, useRef } from "react";

const ContactHeader = ({ handleAddContact }) => {
    const [addContactInfo, setAddContactInfo] = useState("");

    const dialogRef = useRef();

    return (
        <header className="self-stretch w-full  flex items-center bg-secondary_bg rounded-md px-5 py-3 justify-between md:max-w-contact w-full shadow-md">
            <p className="text-black_accent_2 text-lg font-medium">Chat</p>

            <button
                onClick={() => {
                    if (!dialogRef.current) return;

                    dialogRef.current.showModal();
                }}
                className="bg-orange p-2  flex items-center justify-center rounded-full text-white"
            >
                <Image src={addIcon} width={30} height={30} alt="add-icon" />
            </button>

            {/* Make this a separate Compo  */}
            <dialog
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
            </dialog>
        </header>
    );
};

export default ContactHeader;
