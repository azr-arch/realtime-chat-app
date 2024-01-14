"use client";

import { useState, useRef } from "react";

import { AddModal } from "@components/modals/add-modal";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { useChat } from "@context/ChatContext";
import SearchBar from "@components/ui/search-bar";

const ContactHeader = ({ currUser }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setContacts, contacts } = useChat();

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
            const res = await fetch("api/addContact", {
                method: "POST",
                body: JSON.stringify({
                    currUser: currUser?.email,
                    personToAdd: contactToAdd,
                }),
            });

            const { data, error } = await res.json();

            if (error) {
                toast.error(error);
                return;
            }

            if (!data) {
                toast.error("Something went wrong.");
            }

            // setContacts((prev) => [...prev, data]);
            setContacts([...contacts, data]);
            toast.success("Contact added successfully.");
            setOpen(false);
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
            <header className="flex items-center bg-primary rounded-xl px-5 py-5 justify-between md:justify-around md:max-w-contact w-full shadow-md">
                <p className="hidden xs:block text-heading text-lg font-semibold ml-10 md:ml-0">
                    Chat
                </p>

                <SearchBar />

                <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    className="bg-accent_1 rounded-full hover:text-accent_1 hover:ring-white hover:ring-1"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </header>
        </>
    );
};

export default ContactHeader;
