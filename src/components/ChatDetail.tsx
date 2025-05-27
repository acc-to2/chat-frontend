import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import { getChatDetail } from "../apis/chat.api";
import Modal from "./Modal/Modal";
import { FaPlus } from "react-icons/fa";
import AddChatterModal from "./Modal/AddChatterModal";

type ChatMessage = {
  sender: string;
  content: string;
  timestamp: string;
};

const ChatDetail = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useRef<CompatClient | null>(null);
  const { roomId } = useParams();
  const [chatStart, setChatStart] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getChatDetail(Number(roomId));
        if (res.status === 200 && Array.isArray(res.data)) {
          setMessages(res.data);
        }
      } catch (err) {
        console.log("메시지 없음", err);
      }
    };

    fetchHistory();

    const socket = new SockJS("https://to2-chat.shop/chat/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current?.subscribe(`${roomId}/in`, (message) => {
        const chat: ChatMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, chat]);
      });
    });

    return () => {
      stompClient.current?.disconnect(() => {
        console.log("disconnected");
      });
    };
  }, [roomId]);

  const handleSendMessage = (msg: string) => {
    if (stompClient.current && stompClient.current.connected) {
      const chat: ChatMessage = {
        sender: "me",
        content: msg,
        timestamp: new Date().toISOString(),
      };
      stompClient.current.send(`${roomId}/send`, {}, JSON.stringify(chat));
      setMessages((prev) => [...prev, chat]);
    }
  };

  return (
    <div className="m-6 p-8 rounded-3xl flex flex-col gap-10 w-3/6 shadow-lg shadow-sky-100">
      {chatStart && (
        <Modal onClose={() => setChatStart(false)}>
          <AddChatterModal
            setModalOpen={setChatStart}
            roomId={Number(roomId)}
          />
        </Modal>
      )}
      <div className="flex justify-between font-Title text-xl border-b pb-2">
        <h1>채팅방 이름</h1>
        <button onClick={() => setChatStart(true)}>
          <FaPlus size={24} />
        </button>
      </div>

      <ChatBubble chatting={messages} />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatDetail;
