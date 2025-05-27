import ChatDetail from "../components/ChatDetail";
import NavBar from "../components/NavBar";

const Chat = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <ChatDetail />
    </div>
  );
};

export default Chat;
