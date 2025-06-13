import { VscSend } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import { useChat } from "../context/chatContext";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Chat = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [question, setQuestion] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const {
    messages,
    addMessage,
    docId,
    setDocId,
    filename,
    setFilename,
    sessionId,
  } = useChat();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are supported.");
      return;
    }

    try {
      setLoadingUpload(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/upload/`, formData, {
        headers: { "x-session-id": sessionId },
      });

      setDocId(res.data.doc_id);
      setFilename(res.data.filename);
      toast.success("PDF uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload PDF.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSend = async () => {
    if (!question.trim()) return;
    if (!docId) {
      toast.error("Please upload a PDF to start asking questions.");
      return;
    }

    setLoadingQuestion(true);
    addMessage({ role: "user", text: question });

    try {
      const res = await axios.post(
        `${BASE_URL}/ask/`,
        { question, doc_id: docId },
        { headers: { "x-session-id": sessionId } }
      );

      const fullText = res.data.answer;
      let index = 0;
      const typingSpeed = 30; // ms per character

      let currentText = "";
      const interval = setInterval(() => {
        currentText += fullText[index];
        if (index === 0) {
          addMessage({ role: "ai", text: currentText });
        } else {
          // update last message
          addMessage((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "ai", text: currentText };
            return updated;
          });
        }
        index++;

        if (index >= fullText.length) clearInterval(interval);
      }, typingSpeed);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get answer from server.");
    } finally {
      setLoadingQuestion(false);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex py-2 px-10 justify-between shadow-lg bg-white">
        <img
          src="/aiplanet-logo.svg"
          alt="logo"
          width="130px"
          height="41px"
          className="object-cover cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-3 text-sm">
          {filename && (
            <div className="flex items-center gap-1 text-green-600">
              <BsFiletypePdf />
              {filename}
            </div>
          )}
          <label className="inline-flex items-center gap-2 px-6 py-2 bg-white border rounded-xl hover:bg-gray-800 hover:text-white transition cursor-pointer shadow-md">
            {loadingUpload ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              <CiCirclePlus className="text-2xl" />
            )}
            <span className="text-md font-medium">
              {loadingUpload ? "Uploading..." : "Upload PDF"}
            </span>
            <input
              type="file"
              accept=".pdf"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex flex-col justify-between px-20 pt-2 pb-5 flex-grow overflow-hidden">
        <div className="overflow-y-auto flex-grow space-y-3 pr-2">
          {messages.map((msg, index) => (
            <div key={index} className="flex gap-2  items-start text-[16px]">
              <span>
                {msg.role === "user" ? (
                  <div className="rounded-full w-[30px] h-[30px] flex items-center justify-center bg-purple-300">
                    S
                  </div>
                ) : (
                  <img
                    src="/chat-logo.png"
                    alt="ai"
                    width="30px"
                    height="30px"
                  />
                )}
              </span>
              <div
                key={index}
                className={`max-w-[90%] px-4 rounded-lg ${
                  msg.role === "user" ? " self-end" : " self-start"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}

        <div className="mt-4 flex items-center gap-2 px-5 py-3 w-full  h-[3.5rem]  shadow-md border border-gray-300 rounded-[8px]">
          <input
            placeholder="Ask a question"
            className="outline-none bg-transparent w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} disabled={loadingQuestion}>
            {loadingQuestion ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            ) : (
              <VscSend className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
