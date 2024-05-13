import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse, APISimpleResponse } from '@/types/model';
import {
  IPageableReq,
  IPageableMyReivewReq,
  IMyFavoritCampListResq,
  IEmptyNotificationList,
  IMyReviewListRes,
  IPageableMyReservationReq,
  IMyReservationListRes
} from '@/types/my';
import { ILikeRes } from "@/types/reservation";

// 로그인 상태 확인 함수
const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

// 내가 찜한 캠핑장 조회
export const fetchFavoriteCamps = async ({
  pageable,
}: IPageableReq): Promise<IMyFavoritCampListResq> => {
  if (!isUserLoggedIn()) {
    return Promise.reject(new Error("로그인 시에만 api 호출"));
  }

  const response = await axiosAuthInstance.get<
    APIResponse<IMyFavoritCampListResq>
  >(`/mypage/campsite`, {
    params: {
      ...pageable,
    },
  });
  return response.data.data;
};

// 내찜캠 "좋아요 취소" 요청
export const deleteLikes = async (
  campsiteId: number
): Promise<APIResponse<ILikeRes>> => {
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  return res.data;
};

// 빈자리 알림 조회 API 요청
export const fetchMyAlerts = async (): Promise<IEmptyNotificationList> => {
  if (!isUserLoggedIn()) {
    return Promise.reject(new Error("로그인 시에만 api 호출"));
  }
  const response = await axiosAuthInstance.get("/mypage/empty-notification");
  return response.data;
};

// 빈자리 알림 삭제 API 요청
export const deleteMyAlert = async (
  roomId: number
): Promise<{ result: string }> => {
  const response = await axiosAuthInstance.delete(
    `/empty-notification/${roomId}`
  );
  return response.data;
};

// 내 리뷰 조회 API 요청
export const fetchMyReviews = async ({
  pageable,
  dateType,
}: IPageableMyReivewReq): Promise<IMyReviewListRes> => {
  // console.log("페이지 확인:", pageable.page)
  // console.log("사이즈 확인:", pageable.size)
  // console.log("날짜 필터 확인:", dateType)
  const response = await axiosAuthInstance.get<APIResponse<IMyReviewListRes>>(
    `/mypage/review`,
    {
      params: {
        ...pageable,
        dateType,
      },
    }
  );
  return response.data.data;
};

// 내 리뷰 삭제 API 요청
export const deleteReview = async (
  reviewId: number
): Promise<APISimpleResponse> => {
  const response = await axiosAuthInstance.delete<APISimpleResponse>(
    `/review/${reviewId}`
  );
  return response.data;
};

// 내 예약내역 조회 API 요청
export const fetchMyReservations = async ({
  pageable,
  dateType,
  useType
}: IPageableMyReservationReq): Promise<IMyReservationListRes> => {
  const response = await axiosAuthInstance.get<APIResponse<IMyReservationListRes>>(`/mypage/reservation`, {
    params: {
      ...pageable,
      dateType,
      useType,
    },
  });

  return response.data.data;
};