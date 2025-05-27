import instance from "./axios";

// 친구 리스트 조회
export const getFriends = async () => {
  const res = await instance.get("/friend/list/get");
  return res;
};

// 친구 추가
export const postFriend = async (email: string) => {
  const res = await instance.post("/friend/private/add", { email });
  return res;
};

// 친구 삭제
export const deleteFriend = async (email: string) => {
  const res = await instance.delete("/friend/private/delete", {
    data: { email },
  });
  return res;
};

// 채팅방 삭제
export const deleteChat = async (room_id: string) => {
  const res = await instance.delete(`/chat/${room_id}/delete`);
  return res;
};
