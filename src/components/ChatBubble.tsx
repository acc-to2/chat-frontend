import { useEffect, useRef } from "react";
import type { ChatMessage } from "./ChatDetail2";

type Props = {
  chatting: ChatMessage[];
};
const ChatBubble = ({ chatting }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatting]);

  return (
    <div className="overflow-y-auto max-h-[500px] pr-2">
      {chatting
        .filter(
          (item): item is ChatMessage =>
            !!item && !!item.senderEmail && !!item.content
        )
        .map((item, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              item.senderEmail === email ? "justify-end" : "justify-start"
            }`}
          >
            <h3
              className={`font-Title px-4 p-2 rounded-3xl ${
                item.senderEmail === email
                  ? "bg-[#EDEDEC] text-black"
                  : "bg-[#2F97FF] text-white"
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
