"use client";

import { useState, useEffect, useRef } from "react";

import { Modal } from "@components/ui/modal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal
            title={"Are you sure ?"}
            description={"This action will not be reversed."}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant="outline"
                    className=" text-accent_1"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={() => onConfirm()}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
};
