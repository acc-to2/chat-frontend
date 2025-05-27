import instance from "./axios";

// 채팅방 목록 조회
export const getChatList = async () => {
  const res = await instance.get("/chat/room/list");
  return res;
};

// 채팅 내역 상세 조회
export const getChatDetail = async (room_id: string) => {
  const res = await instance.get(`/chat/${room_id}/list/get`);
  return res;
};

// 채팅방 생성
export const createChat = (payload: {
  title: string;
  isGroup: boolean;
  emailList: string[];
}) => {
  return instance.post(`/chat/room/create`, payload);
};

// 채팅방 참가자 추가
export const postChatter = async (room_id: string, emailList: string[]) => {
  const res = await instance.post(
    `/chat/${room_id}/add-friend`,
    {},
    {
      params: {
        emailList: emailList,
      },
    }
  );
  return res;
};
