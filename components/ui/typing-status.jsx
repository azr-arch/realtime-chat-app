"use client";

const TypingEffect = () => {
    return (
        <div className="text-xs text-orange font-semibold flex space-x-1">
            <span>Typing</span>
            <span className="animate-blink scale-150">.</span>
            <span className="animate-blink delay-200 scale-150">.</span>
            <span className="animate-blink delay-400 scale-150">.</span>
        </div>
    );
};

export default TypingEffect;
