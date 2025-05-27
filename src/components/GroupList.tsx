import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import GroupChatModal from "./Modal/GroupChatModal";
import { getChatList } from "../apis/chat.api";
import DeleteChatModal from "./Modal/DeleteChatModal";
import { FaMinusCircle } from "react-icons/fa";

const GroupList = () => {
  const nav = useNavigate();

  const [groups, setGroups] = useState<
    { roomId: string; title: string; message: string; count: number }[]
  >([]);

  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleName = (roomId: string, title: string) => {
    nav(`/chat/${roomId}`, { state: { title } });
  };
  const [chatStart, setChatStart] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const openDeleteModal = (roomId: string) => {
    setSelectedRoom(roomId);
    setDeleteOpen(true);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getChatList();
        if (res.status === 200) {
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
      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <DeleteChatModal setModalOpen={setDeleteOpen} roomId={selectedRoom} />
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
            onClick={() => handleName(chat.roomId, chat.title)}
            key={chat.roomId}
            className="mb-6 pb-4 text-base font-Title border-b-2 flex flex-col gap-2 cursor-pointer"
          >
            <h3>{chat.title}</h3>
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-gray-500">{chat.message}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(chat.roomId);
                }}
              >
                <FaMinusCircle />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
