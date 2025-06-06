import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useLocation, useParams } from "react-router-dom";
import { getChatDetail } from "../apis/chat.api";
import { IoIosSend } from "react-icons/io";
import Modal from "./Modal/Modal";
import AddChatterModal from "./Modal/AddChatterModal";
import { FaPlus } from "react-icons/fa";

export type ChatMessage = {
  senderEmail: string;
  content: string;
  timestamp?: string;
};

type ChatPayload = {
  roomId: string;
  senderId: string;
  type: "IN" | "OUT" | "SEND";
  content: string;
  timestamp: string;
};

const ChatDetail = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const { roomId } = useParams();
  const email = localStorage.getItem("email");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const stompClient = useRef<CompatClient | null>(null);
  const [chatStart, setChatStart] = useState(false);

  // 이전 채팅 기록 불러오기
  const fetchHistory = async () => {
    if (!roomId) return;
    try {
      const res = await getChatDetail(roomId);
      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = res.data.data.map((msg: any) => ({
          senderEmail: msg.senderEmail,
          content: msg.content,
          timestamp: msg.timestamp,
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.log("메시지 없음", err);
    }
  };

  // 메시지 전송
  const sendMessage = (message: string) => {
    if (!email || !roomId || !message || !stompClient.current) return;

    const timestamp = new Date().toISOString();
    const payload: ChatPayload = {
      roomId,
      senderId: email,
      type: "SEND",
      content: message,
      timestamp,
    };

    stompClient.current.send(
      `/chat/${roomId}/send`,
      {},
      JSON.stringify(payload)
    );
    setMessageContent("");
  };

  // 메시지 수신
  const receiveMessage = (payload: { body: string }) => {
    const message = JSON.parse(payload.body);
    console.log("받은 메시지: ", message);

    if (message.senderId && message.content) {
      const formattedMessage = {
        senderEmail: message.senderId,
        content: message.content,
        timestamp: message.timestamp,
      };
      setMessages((prev) => [...prev, formattedMessage]);
    } else {
      console.warn("잘못된 메시지 구조: ", message);
    }
  };

  // 연결 성공 시
  const onConnect = () => {
    if (roomId && email) {
      // 입장 메시지 전송
      const timestamp = new Date().toISOString();
      const payload: ChatPayload = {
        roomId,
        senderId: email,
        type: "IN",
        content: "",
        timestamp,
      };

      stompClient.current?.send(
        `/chat/${roomId}/in`,
        {},
        JSON.stringify(payload)
      );
    }

    // 메시지 구독
    stompClient.current?.subscribe(`/chat/${roomId}/in`, receiveMessage);
    fetchHistory();
  };

  useEffect(() => {
    const socket = new SockJS("https://api.to2-chat.shop/ws");
    stompClient.current = Stomp.over(socket);

    if (stompClient.current !== null) {
      stompClient.current.connect({}, onConnect);
    }

    return () => {
      if (stompClient.current && roomId && email) {
        const timestamp = new Date().toISOString();
        const payload: ChatPayload = {
          roomId,
          senderId: email,
          type: "OUT",
          content: "",
          timestamp,
        };

        stompClient.current.send(
          `/chat/${roomId}/out`,
          {},
          JSON.stringify(payload)
        );
        stompClient.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="m-6 p-8 rounded-3xl flex flex-col gap-4 w-3/6 shadow-lg shadow-sky-100 h-[80vh]">
      {chatStart && roomId && (
        <Modal onClose={() => setChatStart(false)}>
          <AddChatterModal setModalOpen={setChatStart} roomId={roomId} />
        </Modal>
      )}

      {/* 제목 영역 */}
      <div className="flex justify-between font-Title text-xl border-b pb-2">
        <h1>{title}</h1>
        <button onClick={() => setChatStart(true)}>
          <FaPlus size={24} />
        </button>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto">
        <ChatBubble chatting={messages} />
      </div>

      {/* 입력창 */}
      <div className="flex w-full gap-3 pt-2">
        <input
          className="w-full border rounded-xl p-2 font-Title"
          placeholder="Type your message here..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(messageContent);
          }}
        />
        <button
          className="bg-[#2F97FF] rounded-xl p-2"
          onClick={() => sendMessage(messageContent)}
        >
          <IoIosSend size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
