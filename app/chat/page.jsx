"use client";

import Contacts from "@components/Contacts";
import ChatContainer from "@components/ChatContainer";
import SocketIndicator from "@components/SocketIndicator";

const page = () => {
    return (
        <>
            <SocketIndicator />
            <Contacts />

            {/* <ChatContainer /> */}
        </>
    );
};

export default page;
