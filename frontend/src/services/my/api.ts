import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPageableReq, IMyFavoritCampListRes, IEmptyNotificationList } from '@/types/my';

// 내가 찜한 캠핑장 조회
export const fetchFavoriteCamps = async ({
  pageable
}: IPageableReq): Promise<IMyFavoritCampListRes> => {
  const response = await axiosAuthInstance.get<APIResponse<IMyFavoritCampListRes>>(`/mypage/campsite`, {
    params: {
      ...pageable
    },
  });
  return response.data.data;
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