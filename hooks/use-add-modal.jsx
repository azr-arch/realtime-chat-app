const { useState } = require("react");

const useAddContactModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return { isOpen, onOpen, onClose };
};

export default useAddContactModal;
