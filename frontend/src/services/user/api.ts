import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IUserProfileRes, IUserNickNameUpdate, IUserPhoneUpdate, IUserPasswordUpdate } from '@/types/user';

// 내 프로필 조회
export const fetchUserProfile = async (): Promise<APIResponse<IUserProfileRes>> => {
  const response = await axiosAuthInstance.get('/mypage/profile');
  return response.data;
};

// 닉네임 수정 요청
export const updateUserNickName = async (data: IUserNickNameUpdate): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post('/mypage/profile/nickname', null, { params: { nickname: data.nickname } });
  return response.data;
};

// 비밀번호 수정 요청
export const updateUserPassword = async (data: IUserPasswordUpdate): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post('/mypage/profile/password', data);
  return response.data;
};

// 휴대폰 번호 수정 요청
export const updateUserPhone = async (data: IUserPhoneUpdate): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post('/mypage/profile/tel', null, { params: { tel: data.tel } });
  return response.data;
};

