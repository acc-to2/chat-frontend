import { useState } from "react";
import { IoIosSend } from "react-icons/io";

interface Props {
  onSend: (msg: string) => void;
}

const ChatInput = ({ onSend }: Props) => {
  const [message, setMessage] = useState("");

  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full gap-3">
      <input
        className="w-full border rounded-xl p-2 font-Title"
        placeholder="Type your message here..."
        value={message}
        onChange={handleMsgChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="bg-[#2F97FF] rounded-xl p-2" onClick={handleSend}>
        <IoIosSend size={30} color="white" />
      </button>
    </div>
  );
};

export default ChatInput;
