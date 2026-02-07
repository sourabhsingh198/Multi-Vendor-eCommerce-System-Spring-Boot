import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { chatBot } from "../../../Redux Toolkit/Customer/AiChatBotSlice";
import { Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";

interface ChatBotProps {
  handleClose: (e: any) => void;
  productId?: number;
}

const ChatBot = ({ handleClose, productId }: ChatBotProps) => {
  const dispatch = useAppDispatch();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [prompt, setPrompt] = useState("");

  const { aiChatBot } = useAppSelector((store) => store);

  // ✅ SEND PROMPT
  const handleGivePrompt = (e: any) => {
    e.stopPropagation();

    if (!prompt.trim()) return;

    dispatch(
      chatBot({
        prompt: { prompt },
        productId,
        userId: null,
      })
    );

    setPrompt("");
  };

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiChatBot.messages, aiChatBot.loading]);

  return (
    <div className="rounded-lg">
      <div className="w-full lg:w-[40vw] h-[82vh] shadow-2xl bg-white z-50 rounded-lg flex flex-col">
        
        {/* HEADER */}
        <div className="h-[12%] flex justify-between items-center px-5 bg-slate-100 rounded-t-lg">
          <div className="flex items-center gap-3">
            <h1 className="logo">Clothwave</h1>
            <p>AI Assistant</p>
          </div>

          <IconButton onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        </div>

        {/* CHAT BODY */}
        <div className="h-[78%] p-5 overflow-y-auto custom-scrollbar">
          <p className="mb-3 text-gray-600">
            Welcome to Clothwave AI Assistant.{" "}
            {productId
              ? `Ask about product ID: ${productId}`
              : "Ask about your cart or order history."}
          </p>

          {aiChatBot.messages.map((item: any, index: number) =>
            item.role === "user" ? (
              <div key={index} className="flex justify-end">
                <PromptMessage message={item.message} index={index} />
              </div>
            ) : (
              <div key={index} className="flex justify-start">
                <ResponseMessage message={item.message} />
              </div>
            )
          )}

          {aiChatBot.loading && (
            <p className="text-sm text-gray-500 mt-2">fetching data...</p>
          )}

          <div ref={chatContainerRef} />
        </div>

        {/* INPUT */}
        <div className="h-[10%] flex items-center border-t">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="pl-5 h-full w-full bg-slate-100 border-none outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleGivePrompt(e)}
          />
          <Button
            sx={{ borderRadius: "0 0 0.5rem 0" }}
            className="h-full"
            onClick={handleGivePrompt}
            variant="contained"
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
