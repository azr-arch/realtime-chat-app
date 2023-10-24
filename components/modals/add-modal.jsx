"use client";

import useAddContactModal from "@hooks/use-add-modal";
import { useState } from "react";

import { Modal } from "@components/ui/modal";
import { Button } from "@components/ui/button";

export const AddModal = () => {
    const { isOpen, onClose, onOpen } = useAddContactModal();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        console.log("Submit handler");
    };

    console.log("modal render");

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
                    <Button disabled={loading} variant="default">
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
