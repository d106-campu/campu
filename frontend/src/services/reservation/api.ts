import { axiosAuthInstance, axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ILikeRes, IRoomListRes } from "@/types/reservation";
// import axios from "axios"; // msw 할 때는 axios

// 좋아요 요청
export const postLikes = async (
  campsiteId: number
): Promise<APIResponse<ILikeRes>> => {
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  return res.data;
};

// 방 목록 조회
export const getRoomList = async (params: {
  campsiteId: number;
  page: number;
  size: number;
  headCnt: number;
  startDate: string;
  endDate: string;
}): Promise<APIResponse<IRoomListRes>> => {
  const { campsiteId, page, size, headCnt, startDate, endDate } = params;
  const res = await axiosCommonInstance.get(`/campsite/${campsiteId}/room`, {
    params: { page, size, headCnt, startDate, endDate },
  });
  return res.data;
};
