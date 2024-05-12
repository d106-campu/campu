import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPageableReq, IPageableMyReivewReq, IMyFavoritCampListResq, IEmptyNotificationList, IMyReviewListRes } from '@/types/my';
import { ILikeRes } from "@/types/reservation";

// 내가 찜한 캠핑장 조회
export const fetchFavoriteCamps = async ({
  pageable
}: IPageableReq): Promise<IMyFavoritCampListResq> => {
  const response = await axiosAuthInstance.get<APIResponse<IMyFavoritCampListResq>>(`/mypage/campsite`, {
    params: {
      ...pageable
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
  const response = await axiosAuthInstance.get('/mypage/empty-notification');
  return response.data;
}

// 빈자리 알림 삭제 API 요청
export const deleteMyAlert = async (roomId: number): Promise<{ result: string }> => {
  const response = await axiosAuthInstance.delete(`/empty-notification/${roomId}`);
  return response.data;
}

// 내 리뷰 조회 API 요청
export const fetchMyReviews = async ({
  pageable
}: IPageableMyReivewReq): Promise<IMyReviewListRes> => {
  const response = await axiosAuthInstance.get<IMyReviewListRes>(`/mypage/profile`, {
    params: {
      ...pageable
    },
  });
  return response.data;
};