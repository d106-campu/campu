import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import {
  ISignUpReq,
  ISignUpRes,
  ICheckIdRes,
  IVerifyPhoneReq,
  IVerifyPhoneRes
} from '@/types/auth';

// ID 중복 확인
export const checkIdDuplicate = async (account: string): Promise<APIResponse<ICheckIdRes>> => {
  const response = await axiosCommonInstance.get(`/auth/account`, { params: { account: account } });
  return response.data;
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname: string): Promise<APIResponse<ICheckIdRes>> => {
  const response = await axiosCommonInstance.get(`/auth/nickname`, { params: { nickname: nickname } });
  return response.data;
};

// 회원가입 요청
export const postSignUp = async (data: ISignUpReq): Promise<APIResponse<ISignUpRes>> => {
  const response = await axiosCommonInstance.post('/auth/join', data);
  return response.data;
};

// 휴대폰 인증번호 전송
export const sendPhoneVerificationCode = async (tel: string): Promise<APIResponse<{ ok: boolean }>> => {
  const response = await axiosCommonInstance.post(`/auth/tel`, { params: { tel: tel } });
  return response.data;
};

// 휴대폰 중복 확인 요청
export const checkPhoneDuplicate = async (tel: string): Promise<APIResponse<{ available: boolean }>> => {
  const response = await axiosCommonInstance.get(`/auth/tel`, { params: { tel: tel } });
  return response.data;
};

// 휴대폰 인증번호 확인 요청
export const verifyPhoneNumber = async (data: IVerifyPhoneReq): Promise<APIResponse<IVerifyPhoneRes>> => {
  const response = await axiosCommonInstance.post('/auth/tel/verify', data);
  return response.data;
};

// 로그인 요청
export const login = async (data: { account: string; password: string }): Promise<APIResponse<{ user: { account: string; password: string; }; }>> => {
  const response = await axiosCommonInstance.post('/auth/login', data);

  if (response.status === 200 && response.headers.authorization) {
    const token = response.headers.authorization.replace('Bearer ', '');
    localStorage.setItem('accessToken', token);
  }

  return response.data;
};
