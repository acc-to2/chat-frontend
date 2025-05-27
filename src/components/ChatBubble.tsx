import { useEffect, useRef } from "react";

type ChatMessage = {
  sender: string;
  content: string;
  timestamp: string;
};

type Props = {
  chatting: ChatMessage[];
};

const ChatBubble = ({ chatting }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatting]);

  return (
    <div className="overflow-y-auto max-h-[500px] pr-2">
      {chatting.map((item, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            item.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <h3
            className={`font-Title px-4 p-2 rounded-3xl ${
              item.sender === "me"
                ? "bg-[#2F97FF] text-white"
                : "bg-[#EDEDEC] text-black"
            }`}
          >
            {item.content}
          </h3>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBubble;
