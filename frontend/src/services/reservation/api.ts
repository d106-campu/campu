import { axiosAuthInstance, axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse, APISimpleResponse } from "@/types/model";
import {
  IAlertPostReq,
  ILikeRes,
  IRoomListRes,
  ICampsiteRes,
} from "@/types/reservation";
// import axios from "axios"; // msw 할 때는 axios

// 좋아요 요청
export const postLikes = async (
  campsiteId: number
): Promise<APIResponse<ILikeRes>> => {
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  return res.data;
};

// 방 목록 조회
export const getRoomList = async (
  params: {
    campsiteId: number;
    page: number;
    size: number;
    headCnt: number;
    startDate: string;
    endDate: string;
  },
  isLogin: boolean
): Promise<APIResponse<IRoomListRes>> => {
  const { campsiteId, page, size, headCnt, startDate, endDate } = params;
  // 로그인 상태에 따라 적절한 axios 인스턴스 선택
  const axiosInstance = isLogin ? axiosAuthInstance : axiosCommonInstance;
  const res = await axiosInstance.get(`/campsite/${campsiteId}/room`, {
    params: { page, size, headCnt, startDate, endDate },
  });
  return res.data;
};

// 빈자리 알림 등록
export const postAlert = async ({
  roomId,
  startDate,
  endDate,
}: IAlertPostReq): Promise<APISimpleResponse> => {
  const res = await axiosAuthInstance.post(`/empty-notification`, {
    roomId: roomId,
    startDate: startDate,
    endDate: endDate,
  });
  return res.data;
};

// 빈자리 알림 취소
export const deleteAlert = async (
  roomId: number
): Promise<APISimpleResponse> => {
  const res = await axiosAuthInstance.delete(`/empty-notification/${roomId}`);
  return res.data;
};

// 캠핑장 상세 조회
export const getCapmsite = async (
  campsiteId: number,
  isLogin: boolean
): Promise<APIResponse<ICampsiteRes>> => {
  // 로그인 상태에 따라 적절한 axios 인스턴스 선택
  const axiosInstance = isLogin ? axiosAuthInstance : axiosCommonInstance;
  const res = await axiosInstance.get(`/campsite/${campsiteId}`);
  return res.data;
};
