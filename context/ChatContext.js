"use client";

import { createContext, useContext, useState } from "react";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState("");

  //   useEffect(() => {
  //     const currChat = JSON.parse(localstorage.getItem("currChat"))
  //   }, [])

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
