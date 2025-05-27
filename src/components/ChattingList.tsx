import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../apis/chat.api";

const ChattingList = () => {
  const nav = useNavigate();

  const [individuals, setIndividuals] = useState<
    { id: number; name: string; lastChat: string; numChat: number }[]
  >([]);

  const handleName = (roomId: number) => {
    nav(`/chat/${roomId}`);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getChatList();
        if (res.status === 200) {
          console.log(res);
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
      <h1 className="font-Title text-xl">Chatting</h1>
      <div className="overflow-y-auto max-h-full pr-2">
        {individuals.map((chat) => (
          <div
            onClick={() => handleName(chat.id)}
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

export default ChattingList;
