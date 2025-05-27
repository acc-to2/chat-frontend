import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import GroupChatModal from "./Modal/GroupChatModal";
import { getChatList } from "../apis/chat.api";

const GroupList = () => {
  const nav = useNavigate();

  const [groups, setGroups] = useState<
    { id: number; name: string; lastChat: string; numChat: number }[]
  >([]);

  const handleName = (name: string) => {
    nav(`/chat/${name}`); // 아마 나중에는 멤버 id로 가야할 듯
  };
  const [chatStart, setChatStart] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getChatList();
        if (res.status === 200) {
          console.log(res);
          setGroups(res.data.data.groupRoomList);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
      }
    };
    getList();
  }, []);

  return (
    <div className="m-6 p-8 rounded-3xl flex flex-col gap-10 w-2/6 shadow-lg shadow-sky-100">
      {chatStart && (
        <Modal onClose={() => setChatStart(false)}>
          <GroupChatModal setModalOpen={setChatStart} />
        </Modal>
      )}
      <div className="flex items-center justify-between">
        <h1 className="font-Title text-xl">Groups</h1>
        <button onClick={() => setChatStart(true)}>
          <FaPlus size={24} />
        </button>
      </div>
      <div className="overflow-y-auto max-h-full pr-2">
        {groups.map((chat) => (
          <div
            onClick={() => handleName(chat.name)}
            key={chat.id}
            className="mb-6 pb-4 text-base font-Title border-b-2 flex flex-col gap-2 cursor-pointer"
          >
            <h3>{chat.name}</h3>
            <h3 className="text-sm text-gray-500">{chat.lastChat}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
