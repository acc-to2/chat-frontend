import { deleteFriend } from "../../apis/friends.api";

interface FriendProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

const DeleteFriendModal = ({ setModalOpen, email }: FriendProps) => {
  const handleAccept = async () => {
    try {
      const res = await deleteFriend(email);
      if (res.status === 200) {
        setModalOpen(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleCancel = async () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col p-8 gap-6 w-[400px] bg-white rounded-[16px]">
      <div className="text-center text-lg leading-8 font-Title">친구 삭제</div>
      <div className="text-center text-sm leading-8 text-gray-600 font-Title">
        정말 삭제하시겠습니까?
      </div>

      <div className="flex justify-center gap-4 w-full text-base">
        <button
          className="w-full bg-primary_700 rounded-full py-3.5 font-Title"
          onClick={handleAccept}
        >
          네
        </button>
        <button
          className="w-full bg-primary_700 rounded-full py-3.5 font-Title"
          onClick={handleCancel}
        >
          아니요
        </button>
      </div>
    </div>
  );
};

export default DeleteFriendModal;
