import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

export const Modal = ({ title, description, isOpen, onClose, children }) => {
    const onChange = (open) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog className="bg-black" open={isOpen} onOpenChange={onChange}>
            <DialogContent className="bg-black border-white/20 text-white">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
};
