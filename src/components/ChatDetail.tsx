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
import { jwtDecode, type JwtPayload } from "jwt-decode";

export type ChatMessage = {
  messageId: string;
  senderEmail: string;
  content: string;
  timestamp: string;
};

type ChatPayload = {
  roomId: string;
  senderId: string;
  type: "IN" | "OUT" | "SEND";
  content: string;
  timestamp: string;
};

const ChatDetail = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useRef<CompatClient | null>(null);
  const { roomId } = useParams();
  const [chatStart, setChatStart] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    const decoded = jwtDecode(accessToken) as JwtPayload & { email: string };
    setEmail(decoded.email);
    localStorage.setItem("email", decoded.email);

    const fetchHistory = async () => {
      if (!roomId) return;
      try {
        const res = await getChatDetail(roomId);
        if (res.status === 200) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.log("메시지 없음", err);
      }
    };

    fetchHistory();

    const socket = new SockJS("https://api.to2-chat.shop/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current?.subscribe(`/chat/${roomId}/in`, (message) => {
        if (!message.body) return;
        const receivedMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });

    return () => {
      stompClient.current?.disconnect(() => {
        console.log("disconnected");
      });
    };
  }, [accessToken, roomId]);

  const handleSendMessage = (msg: string) => {
    if (stompClient.current && stompClient.current.connected && roomId) {
      const timestamp = new Date().toISOString();
      const payload: ChatPayload = {
        roomId,
        senderId: email,
        type: "SEND",
        content: msg,
        timestamp,
      };

      stompClient.current.send(
        `/chat/${roomId}/send`,
        {},
        JSON.stringify(payload)
      );

      // 클라이언트에서도 즉시 화면에 보이게 하기
      const myMessage: ChatMessage = {
        messageId: crypto.randomUUID(), // 임시 ID
        senderEmail: email,
        content: msg,
        timestamp,
      };
      setMessages((prev) => [...prev, myMessage]);
    }
  };

  return (
    <div className="m-6 p-8 rounded-3xl flex flex-col gap-10 w-3/6 shadow-lg shadow-sky-100">
      {chatStart && roomId && (
        <Modal onClose={() => setChatStart(false)}>
          <AddChatterModal setModalOpen={setChatStart} roomId={roomId} />
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
