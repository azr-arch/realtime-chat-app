"use client";

import { useState, useEffect, useRef } from "react";

import { Modal } from "@components/ui/modal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export const AddModal = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState(false);

    // Using ref for now
    const inputRef = useRef(null);

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
                <Input ref={inputRef} placeholder="Email" />

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={loading}
                        variant="default"
                        className="bg-orange text-accent_1"
                        onClick={() => onConfirm(inputRef?.current.value)}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
