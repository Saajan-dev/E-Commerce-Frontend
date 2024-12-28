import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { IoClose, IoSend } from "react-icons/io5";
import { getErrorMessage } from "../../utils/helpers";
import {
  deleteAllChatBotMessages,
  getAllChatBotMessages,
} from "../../services/ProductService";
import { toastMessage } from "../../components/ToastMessage";
import Loader from "../../components/loader";
import { MdDelete } from "react-icons/md";

interface Message {
  chatbot_id: number;
  sender: "user" | "bot";
  content: any;
}

const socket: Socket = io("http://localhost:8000");

const ChatBot: React.FC = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllmessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          chatbot_id: 1,
          sender: "bot",
          content: "Hi there! How can I assist you today?",
        },
      ]);
    }

    socket.on("message", (message: string) => {
      console.log("MESSAGE", message);
      const botMessage: any = {
        chatbot_id: Date.now(),
        sender_msg: "bot",
        content: message ? JSON.parse(message) : "No Product found.",
      };
      setMessages((prev) => [...prev, botMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      chatbot_id: Date.now(),
      sender: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    socket.emit("message", input.trim());
  };

  const getAllmessages = async () => {
    setisLoading(true);
    try {
      const response = await getAllChatBotMessages();
      const { data, status, message } = response?.data;

      if (status) {
        const formattedMessages = data.flatMap((msg: any) => {
          const messagesArray = [];
          if (msg.sender_msg) {
            messagesArray.push({
              id: `${msg.chatbot_id}-sender`,
              sender: "user",
              content: msg.sender_msg,
            });
          }
          if (msg.receiver_msg) {
            messagesArray.push({
              id: `${msg.chatbot_id}-receiver`,
              sender: "bot",
              content: msg.receiver_msg || message,
            });
          }
          return messagesArray;
        });

        setMessages([
          {
            id: 1,
            sender: "bot",
            content: "Hi there! How can I assist you today?",
          },
          ...formattedMessages,
        ]);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  const clearAllMessages = async () => {
    setisLoading(true);
    try {
      const response = await deleteAllChatBotMessages();
      const { message, status } = response?.data;
      if (status) {
        toastMessage("success", message);
        setMessages([
          {
            chatbot_id: 1,
            sender: "bot",
            content: "Hi there! How can I assist you today?",
          },
        ]);
        setIsOpen(false);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white shadow-lg"
          >
            💬
          </button>
        )}

        {isOpen && (
          <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">ChatBot</h3>
              <div className="flex items-center gap-2">
                <MdDelete
                  className="cursor-pointer text-2xl"
                  onClick={() => clearAllMessages()}
                />
                <IoClose
                  className="cursor-pointer text-2xl"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-[400px] space-y-4">
              {messages.map((msg: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {typeof msg.content == "object" ? (
                      <span className="flex items-start flex-col gap-2">
                        {msg.content?.product_name && (
                          <span>
                            <strong className="">Name:</strong>{" "}
                            {msg.content?.product_name ?? ""}
                          </span>
                        )}
                        {msg?.content?.price && (
                          <span>
                            <strong className="">Price:</strong> ₹{" "}
                            {Number(msg?.content.price).toLocaleString("en-IN")}
                            .00
                          </span>
                        )}
                      </span>
                    ) : (
                      msg.content ?? "No Product found."
                    )}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t flex items-center gap-1">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <IoSend />
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default ChatBot;
