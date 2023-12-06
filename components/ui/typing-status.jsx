"use client";

import { useEffect, useRef } from "react";

const TypingEffect = () => {
    // const typingRef = useRef(null);

    // useEffect(() => {
    //     if (typingRef.current) {
    //         typingRef.current.scrollIntoView();
    //     }
    // }, []);

    return (
        <div
            // ref={typingRef}
            className="text-xs text-orange font-semibold flex space-x-1 animate-in animate-out px-3"
        >
            <span>typing</span>
            <span className="animate-blink scale-150">.</span>
            <span className="animate-blink delay-200 scale-150">.</span>
            <span className="animate-blink delay-400 scale-150">.</span>
        </div>
    );
};

export default TypingEffect;
