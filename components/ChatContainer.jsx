"use client";

import { useChat } from "@context/ChatContext";
import { useEffect, useState } from "react";
import { useSocket } from "@context/SocketContext";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { formatTime } from "@utils/utils";
import moment from "moment/moment";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const SEND_MSG_EVENT = "send-message";
const RECEIVE_MSG_EVENT = "receive-message";

const ChatContainer = () => {
  // Chat id to fetch corresponding chat me ssages --> ToDo Use context
  // Store all the chat messages in here state
  const { currentChat } = useChat(); // Id of currentChat
  const [messages, setMessages] = useState([]);
  const { socket, isConnected } = useSocket();
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;
    setLoading(true);

    const senderId = session?.user?.sub;
    const receiverId = Object.entries(currentChat)
      .filter(([key, value]) => {
        return key === "_id" && value !== senderId;
      })
      .map(([_, value]) => {
        return value;
      });

    try {
      const res = await fetch(
        `http://localhost:3000/api/socket/message/${currentChat._id}`,
        {
          method: "POST",
          body: JSON.stringify({
            users: { senderId, receiverId: receiverId[0] },
            content: message,
          }),
        }
      );
      const msg = await res.json();

      setMessages([...messages, msg]);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (currentChat) {
      const fetchData = async () => {
        try {
          const res = await fetch("api/getMessages", {
            method: "POST",
            body: JSON.stringify({ chatId: currentChat._id }),
          });

          const { data } = await res.json();
          // console.log(data);
          setMessages((prev) => [...data]);
        } catch (error) {
          // console.log(error);
        }
      };
      fetchData();
    }
  }, [currentChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on(RECEIVE_MSG_EVENT, (msg) => {
      // console.log("receive msg event");
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off(RECEIVE_MSG_EVENT);
    };
  }, [socket]);

  return (
    <div className="w-full grow flex flex-col items-start p-5 bg-slate-700">
      {/* All Chats will be shown in here  */}
      {/* Header  */}

      {currentChat ? (
        <>
          <ChatHeader
            selectedChat={currentChat}
            currUserEmail={session?.user.email}
          />
          <div className="grow w-full overflow-y-scroll my-5">
            {messages.length > 0 ? (
              <div className="flex flex-col gap-2 px-2 py-1 md:px-5 md:py-3">
                {messages.map((msg, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`w-fit ${
                        msg?.sender?._id?.toString() === session.user?.sub
                          ? "self-start items-start"
                          : "self-end items-end"
                      } flex flex-col  rounded-sm py-2 px-4 bg-slate-200 text-black`}
                    >
                      <p>{msg?.content}</p>
                      <time className="text-[10px] font-medium mt-[2px]">
                        {moment(msg.updatedAt).format("HH:mm")}
                      </time>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No Messages</p>
            )}
          </div>

          <MessageInput
            value={message}
            onChange={handleChange}
            onSubmit={sendMessage}
            loading={loading}
          />
        </>
      ) : (
        <p>Select a chat</p>
      )}
    </div>
  );
};

export default ChatContainer;
