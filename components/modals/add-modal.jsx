"use client";

import { useState, useEffect } from "react";

import { Modal } from "@components/ui/modal";
import { Button } from "@components/ui/button";

export const AddModal = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState(false);

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
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant="default" onClick={onConfirm}>
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
