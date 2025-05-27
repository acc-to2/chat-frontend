import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../apis/chat.api";
import Modal from "./Modal/Modal";
import { FaMinusCircle } from "react-icons/fa";
import DeleteChatModal from "./Modal/DeleteChatModal";

const ChattingList = () => {
  const nav = useNavigate();

  const [individuals, setIndividuals] = useState<
    { roomId: string; title: string; message: string; count: number }[]
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleName = (roomId: string) => {
    nav(`/chat/${roomId}`);
  };
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
          setIndividuals(res.data.data.privateRoomList);
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
      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <DeleteChatModal setModalOpen={setDeleteOpen} roomId={selectedRoom} />
        </Modal>
      )}
      <h1 className="font-Title text-xl">Chatting</h1>
      <div className="overflow-y-auto max-h-full pr-2">
        {individuals.map((chat) => (
          <div
            onClick={() => handleName(chat.roomId)}
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

export default ChattingList;
