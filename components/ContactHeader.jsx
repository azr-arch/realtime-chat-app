"use client";

import { useState, useRef } from "react";
import { AddModal } from "./modals/add-modal";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

const ContactHeader = ({ currUser }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleAddContact = async (contactToAdd) => {
        if (!contactToAdd) return;
        if (!currUser) return;

        // TODO: Check if contactToAdd is email or not
        if (contactToAdd === currUser?.email) {
            toast.error("You cant add your self.");
            return;
        }

        setLoading(true);

        try {
            await fetch("api/addContact", {
                method: "POST",
                body: JSON.stringify({
                    currUser: currUser?.email,
                    personToAdd: contactToAdd,
                }),
            });

            // setLoading(false)
            toast.success("Contact added successfully.");
            setOpen(false);
            // window.location.href = "/chat"; // for Hard refresh
            router.refresh();
        } catch (error) {
            console.log("error occured: ", error);
            toast.error(error.message | "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AddModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleAddContact}
            />
            <header className="flex items-center bg-secondary_bg rounded-md px-5 py-3 h-16 justify-between md:max-w-contact w-full shadow-md">
                <p className="text-black_accent_2 text-lg font-medium">Chat</p>

                <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    className="bg-orange rounded-full"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </header>
        </>
    );
};

export default ContactHeader;
