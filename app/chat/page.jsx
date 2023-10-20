"use client";

import Contacts from "@components/Contacts";
import ChatContainer from "@components/chatMessage/ChatContainer";
import SocketIndicator from "@components/SocketIndicator";

const page = () => {
    return (
        <>
            <SocketIndicator />
            <div className="w-full h-full self-stretch items-start flex flex-col md:flex-row gap-4  md:gap-2">
                <Contacts />
                <ChatContainer />
            </div>
        </>
    );
};

export default page;
