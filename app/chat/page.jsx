import ChatPageClient from "@components/chat-page-client";
import { Suspense } from "react";

const ChatPage = async () => {
    return (
        <>
            <div className="w-full h-full self-stretch items-start flex flex-col md:flex-row gap-4  md:gap-2">
                <Suspense className={<p>Loading...</p>}>
                    <ChatPageClient />
                </Suspense>
            </div>
        </>
    );
};

export default ChatPage;
