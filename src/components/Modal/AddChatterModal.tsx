import { useEffect, useState } from "react";
import { getFriends } from "../../apis/friends.api";
import { postChatter } from "../../apis/chat.api";

interface FriendProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: string;
}

const AddChatterModal = ({ setModalOpen, roomId }: FriendProps) => {
  const [friends, setFriends] = useState<{ nickName: string; email: string }[]>(
    []
  );

  const handleAccept = async () => {
    try {
      const res = await postChatter(roomId, selectedFriends);
      if (res.status === 201) {
        console.log(res);
        setModalOpen(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const onClickFriends = (name: string) => {
    setSelectedFriends((prev) => {
      if (prev.includes(name)) {
        return prev.filter((selectedFriend) => selectedFriend !== name);
      }
      return [...prev, name];
    });
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
        채팅방 멤버 추가
      </div>
      <div className="text-center text-sm leading-8 text-gray-600 font-Title">
        그룹 채팅을 함께할 친구를 선택해주세요
      </div>
      {/* 친구 리스트 */}
      <div className="overflow-y-auto max-h-full pr-2">
        {friends.map((friend, index) => {
          const isSelected = selectedFriends.includes(friend.email);
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

export default AddChatterModal;
