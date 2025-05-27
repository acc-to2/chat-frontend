import { useEffect, useRef } from "react";
import type { ChatMessage } from "./ChatDetail";

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
        .map((item, index) => {
          const isMine = item.senderEmail === email;
          return (
            <div
              key={index}
              className={`flex flex-col mb-4 ${
                isMine ? "items-end" : "items-start"
              }`}
            >
              {!isMine && (
                <span className="text-xs text-gray-500 ml-2 mb-1">
                  {item.senderEmail}
                </span>
              )}
              <div
                className={`font-Title px-4 p-2 rounded-3xl max-w-[70%] break-words ${
                  isMine ? "bg-[#EDEDEC] text-black" : "bg-[#2F97FF] text-white"
                }`}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBubble;
