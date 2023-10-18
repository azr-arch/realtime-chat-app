"use client";

import Contacts from "@components/Contacts";
import ChatContainer from "@components/ChatContainer";
import SocketIndicator from "@components/SocketIndicator";

const page = () => {
  return (
    <div className="flex  gap-4 bg-black w-screen h-screen relative">
      <SocketIndicator />
      <Contacts />

      <ChatContainer />
    </div>
  );
};

export default page;
