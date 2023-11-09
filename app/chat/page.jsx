import ChatPageClient from "@components/chat-page-client";

const ChatPage = async () => {
    return (
        <>
            <div className="w-full h-full self-stretch items-start flex flex-col md:flex-row gap-4  md:gap-2">
                <ChatPageClient />
            </div>
        </>
    );
};

export default ChatPage;
