import { FaMinusCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import AddFriendModal from "./Modal/AddFriendModal";
import DeleteFriendModal from "./Modal/DeleteFriendModal";
import { getFriends } from "../apis/friends.api";

const FriendsList = () => {
  const [friends, setFriends] = useState<{ nickName: string; email: string }[]>(
    []
  );

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const openDeleteModal = (email: string) => {
    setSelectedEmail(email);
    setDeleteOpen(true);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getFriends();
        if (res.status === 200) {
          setFriends(res.data.data);
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
      {addOpen && (
        <Modal onClose={() => setAddOpen(false)}>
          <AddFriendModal setModalOpen={setAddOpen} />
        </Modal>
      )}
      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <DeleteFriendModal
            setModalOpen={setDeleteOpen}
            email={selectedEmail}
          />
        </Modal>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-Title text-xl">Friends</h1>
        <button onClick={() => setAddOpen(true)}>
          <IoMdPersonAdd size={24} />
        </button>
      </div>
      <div className="overflow-y-auto max-h-full pr-2">
        {friends.map((friend, index) => (
          <div
            key={index}
            className="mb-6 pb-4 text-base font-Title border-b-2 flex items-center justify-between"
          >
            <div>{friend.nickName}</div>
            <button onClick={() => openDeleteModal(friend.email)}>
              <FaMinusCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
