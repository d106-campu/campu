import { IEmptyNotificationList } from '@/types/myFreeAlert';
// import { APIResponse } from "@/types/model";
import { axiosAuthInstance } from '@/apis/axiosInstance';

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