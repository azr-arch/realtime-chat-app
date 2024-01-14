"use client";

import { useState, useEffect, useRef } from "react";

import { Modal } from "@components/ui/modal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Plus, Search } from "lucide-react";
import { fetchData } from "next-auth/client/_utils";

export const AddModal = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    // Using ref for now
    const inputRef = useRef(null);

    const searchContact = async () => {
        if (inputRef?.current?.value === "" || !inputRef.current) return;

        setIsLoading(true);
        try {
            const res = await fetch("/api/search", {
                method: "POST",
                body: JSON.stringify({ value: inputRef.current.value }),
            });

            const data = await res.json();

            setFetchedData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal
            title={"Add Contact"}
            description={"Add a new person"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <div className="flex items-center gap-2">
                    <Input ref={inputRef} placeholder="Email" disabled={isLoading} />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={searchContact}
                        disabled={isLoading}
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                </div>

                {fetchedData?.name ? (
                    <div className="flex items-center gap-4">
                        <p>{fetchedData?.name}</p>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onConfirm(inputRef?.current?.value)}
                            disabled={isLoading}
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                ) : null}
                {fetchedData?.notFound && <p>No user found</p>}
            </div>
        </Modal>
    );
};
