import Image from "next/image";
import sendIcon from "@styles/assets/send.svg";

const MessageInput = ({ value, onChange, onSubmit, loading }) => {
    // Sends message with Enter
    const handleKeyPress = (e) => {
        if (!value) return;
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value) return;
        onSubmit();
    };

    return (
        <div className="w-full mt-auto flex items-center gap-3 overflow-hidden justify-between rounded-l-lg ">
            <div className="grow h-full  bg-secondary_bg rounded-r-lg overflow-hidden ">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyPress}
                    className={`grow h-full w-full px-5 outline-none
                                 py-4 font-medium text-sm placeholder:opacity-50 
                                 placeholder-black_accent_2`}
                    placeholder="Write messages..."
                />
            </div>

            {/* LEFT HERE  */}
            <button
                disabled={loading}
                // style={loading && { opacity: 0.4 }}
                onClick={handleSubmit}
                className={`bg-orange rounded-lg ml-auto hover:text-white p-4 shadow-md ${
                    loading ? "opacity-70" : ""
                }`}
            >
                <Image src={sendIcon} width={20} height={20} alt="send-icon" />
            </button>
        </div>
    );
};

export default MessageInput;
