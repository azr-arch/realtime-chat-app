"use client";

import Contacts from "@components/Contacts";
import ChatContainer from "@components/ChatContainer";

const page = () => {
  return (
    <div className="flex  gap-4 bg-black w-screen h-screen">
      <Contacts />

      <ChatContainer />
    </div>
  );
};

export default page;
