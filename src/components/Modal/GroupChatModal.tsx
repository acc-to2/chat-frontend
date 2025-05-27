import { useEffect, useState } from "react";
import { getFriends } from "../../apis/friends.api";
import { createChat } from "../../apis/chat.api";

interface FriendProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupChatModal = ({ setModalOpen }: FriendProps) => {
  const [friends, setFriends] = useState<{ nickName: string; email: string }[]>(
    []
  );

  const [roomInfo, setRoomInfo] = useState<{
    title: string;
    isGroup: boolean;
    emailList: string[];
  }>({
    title: "",
    isGroup: true,
    emailList: [],
  });

  const handleAccept = async () => {
    try {
      const payload = {
        ...roomInfo,
        isGroup: roomInfo.emailList.length > 1,
      };
      const res = await createChat(payload);
      if (res.status === 201) {
        setModalOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickFriends = (email: string) => {
    setRoomInfo((prev) => {
      const alreadySelected = prev.emailList.includes(email);
      const updatedEmailList = alreadySelected
        ? prev.emailList.filter((e) => e !== email)
        : [...prev.emailList, email];

      return {
        ...prev,
        emailList: updatedEmailList,
        isGroup: updatedEmailList.length > 1,
      };
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setRoomInfo((prev) => ({ ...prev, title: newTitle }));
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getFriends();
        if (res.status === 200) {
          setFriends(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-6 w-[400px] h-[600px] bg-white rounded-[16px]">
      <div className="text-center text-lg leading-8 font-Title">
        채팅방 생성
      </div>
      <div className="text-center text-sm leading-8 text-gray-600 font-Title">
        채팅을 함께할 친구를 선택해주세요
      </div>

      {/* 채팅방 이름 입력 */}
      <input
        type="text"
        value={roomInfo.title}
        onChange={handleTitleChange}
        placeholder="채팅방 이름을 입력하세요"
        className="border border-gray-300 rounded-md py-2 px-3 font-Title"
      />

      {/* 친구 리스트 */}
      <div className="overflow-y-auto max-h-full pr-2">
        {friends.map((friend, index) => {
          const isSelected = roomInfo.emailList.includes(friend.email);
          return (
            <div
              key={index}
              className="mb-4 text-base font-Title flex items-center justify-between"
            >
              <button
                onClick={() => onClickFriends(friend.email)}
                className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {friend.nickName}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 w-full text-base">
        <button
          className="w-full bg-primary_700 rounded-full py-3.5 font-Title"
          onClick={handleAccept}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default GroupChatModal;
