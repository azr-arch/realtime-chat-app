"use client";

import { useChat } from "@context/ChatContext";
import Image from "next/image";

const ChatHeader = ({ selectedChat, currUserEmail }) => {
  function getReceiver(item) {
    const receiver = item.filter((itm) => itm.email !== currUserEmail);
    return receiver[0];
  }

  const receiver = getReceiver(selectedChat?.participants);
  return (
    <div className="w-full flex items-center gap-4 px-5 py-2 bg-black">
      <img
        src={receiver?.avatar}
        width={40}
        height={40}
        className="rounded-full"
        alt="user-profile"
      />

      <div className="flex flex-col items-start gap-2">
        <p className="text-white text-lg">{receiver?.name}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
