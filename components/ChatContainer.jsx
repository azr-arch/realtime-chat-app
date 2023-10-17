"use client";

import { useChat } from "@context/ChatContext";
import { useEffect, useState } from "react";
import { useSocket } from "@context/SocketContext";
import io from "socket.io-client";

const ChatContainer = () => {
  // Chat id to fetch corresponding chat me ssages --> ToDo Use context
  // Store all the chat messages in here state
  const { currentChat } = useChat(); // Id of currentChat
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  useEffect(() => {
    if (currentChat) {
      const fetchData = async () => {
        try {
          const res = await fetch("api/getMessages", {
            method: "POST",
            body: JSON.stringify({ chatId: currentChat }),
          });

          const { data } = await res.json();
          console.log("Fetched Messages: ", data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [currentChat]);

  // useEffect(() => {
  //   console.log(socket)
  //   // Handle socket events here
  // }, [socket]);

  console.log(socket);

  console.log(currentChat);
  return (
    <div className="w-full grow flex flex-col items-start p-5 bg-slate-700">
      {/* All Chats will be shown in here  */}
      <div className="grow w-full h-full">
        {!currentChat ? <p>Select a chat</p> : <p>chat will be here</p>}
      </div>

      <div className="flex items-center gap-2 w-full">
        <input type="text" name="message" id="message" placeholder="Message" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
