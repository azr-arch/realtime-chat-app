"use client";

import { useEffect, useState } from "react";

const useTabActive = () => {
    const [documentVisible, setDocumentVisible] = useState(document.visibilityState);
    const [browserVisible, setBrowserVisible] = useState(document.hasFocus());

    useEffect(() => {
        const handleVisibilityChange = () => {
            setDocumentVisible(document.visibilityState);
        };

        const handleBrowserVisibilityChange = () => {
            setBrowserVisible(document.hasFocus());
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        if (window !== undefined) {
            window.addEventListener("focus", handleBrowserVisibilityChange);
            window.addEventListener("blur", handleBrowserVisibilityChange);
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", handleBrowserVisibilityChange);
            window.removeEventListener("blur", handleBrowserVisibilityChange);
        };
    }, []);

    return documentVisible === "visible" && browserVisible;
};

export default useTabActive;
