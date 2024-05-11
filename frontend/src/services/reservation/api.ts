import { axiosAuthInstance, axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ILikeRes, IRoomListRes } from "@/types/reservation";

// 좋아요 요청
export const postLikes = async (
  campsiteId: number
): Promise<APIResponse<ILikeRes>> => {
  console.log(`Sending like request for campsite ID: ${campsiteId}`); // 요청 로깅
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  console.log(res); // 응답 로깅
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
