import { useState } from "react";
import { postFriend } from "../../apis/friends.api";

interface FriendProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFriendModal = ({ setModalOpen }: FriendProps) => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAccept = async () => {
    try {
      const res = await postFriend(email);
      if (res.status === 201) {
        setModalOpen(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-8 gap-6 w-[400px] bg-white rounded-[16px]">
      <div className="text-center text-lg leading-8 font-Title">친구 추가</div>
      <div className="text-center text-sm leading-8 text-gray-600 font-Title">
        추가할 친구의 이메일을 입력해주세요
      </div>

      <div className="flex flex-1 flex-col justify-center w-full gap-1.5 font-Title">
        <input
          value={email}
          placeholder="이메일을 입력해주세요!"
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3"
        />
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

export default AddFriendModal;
