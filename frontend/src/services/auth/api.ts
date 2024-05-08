import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import {
  ISignUpReq,
  ISignUpRes,
  ICheckIdRes,
  IVerifyPhoneReq,
  IVerifyPhoneRes
} from '@/types/auth';

// ID 중복 확인 -> Response 응답 : "true" or "false"
export const checkIdDuplicate = async (account: string): Promise<APIResponse<ICheckIdRes>> => {
  const response = await axiosCommonInstance.get(`/api/auth/account?account=${account}`);
  return response.data;
};

// 닉네임 중복 확인 -> Response 응답 : "true" or "false"
export const checkNicknameDuplicate = async (nickname: string): Promise<APIResponse<ICheckIdRes>> => {
  const response = await axiosCommonInstance.get(`/api/auth/nickname?nickname=${nickname}`);
  return response.data;
};

// 회원가입 요청 -> Response 응답 : ok
export const postSignUp = async (data: ISignUpReq): Promise<APIResponse<ISignUpRes>> => {
  const response = await axiosCommonInstance.post('/api/auth/join', data);
  return response.data;
};

// 휴대폰 인증번호 전송 -> Response 응답 : ok
export const sendPhoneVerificationCode = async (tel: string): Promise<APIResponse<{ ok: boolean }>> => {
  const response = await axiosCommonInstance.post(`/api/auth/tel?tel=${tel}`);
  return response.data;
};

// 휴대폰 중복 확인 요청 -> Response 응답 : "true" or "false"
export const checkPhoneDuplicate = async (tel: string): Promise<APIResponse<{ available: boolean }>> => {
  const response = await axiosCommonInstance.get(`/api/auth/tel?tel=${tel}`);
  return response.data;
};

// 휴대폰 인증번호 확인 요청 -> Response 응답 : "true" or "false" (verify)
export const verifyPhoneNumber = async (data: IVerifyPhoneReq): Promise<APIResponse<IVerifyPhoneRes>> => {
  const response = await axiosCommonInstance.post('/api/auth/tel/verify', data);
  return response.data;
};
