import React, { createContext, useContext, useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (msg: Message | ((prev: Message[]) => Message[])) => void;
  docId: string | null;
  setDocId: (id: string) => void;
  filename: string | null;
  setFilename: (name: string) => void;
  sessionId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [docId, setDocId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const sessionId = sessionStorage.getItem("session_id") || crypto.randomUUID();

  // Store it once
  if (!sessionStorage.getItem("session_id")) {
    sessionStorage.setItem("session_id", sessionId);
  }

  const addMessage = (
    messageOrUpdater: Message | ((prev: Message[]) => Message[])
  ) => {
    if (typeof messageOrUpdater === "function") {
      setMessages(messageOrUpdater);
    } else {
      setMessages((prev) => [...prev, messageOrUpdater]);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        docId,
        setDocId,
        filename,
        setFilename,
        sessionId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
