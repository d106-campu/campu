import { useMutation, useQuery } from '@tanstack/react-query';
import {
  checkIdDuplicate,
  checkNicknameDuplicate,
  postSignUp,
  sendPhoneVerificationCode,
  verifyPhoneNumber,
  checkPhoneDuplicate,
  login
} from '@/services/auth/api';
import { ISignUpReq, IVerifyPhoneReq } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();

  // 아이디 중복 검사
  const checkId = (account: string) => useQuery({
    queryKey: ['당신의 아이디 확인! :', account],
    queryFn: () => checkIdDuplicate(account)
  });

  // 닉네임 중복 검사
  const checkNickname = (nickname: string) => useQuery({
    queryKey: ['당신의 닉네임 확인! :', nickname],
    queryFn: () => checkNicknameDuplicate(nickname)
  });

  // 회원가입 요청
  const signupMutation = useMutation({
    mutationFn: (data: ISignUpReq) => postSignUp(data),
    onSuccess: res => {
      console.log("회원가입 성공했음!! :", res)
    },
    onError: (error) => {
      console.error('회원가입 에러났어!! :', error);
    }
  });

  // 휴대폰 번호 중복 검사
  const checkPhone = useMutation({
    mutationFn: (tel: string) => checkPhoneDuplicate(tel),
    onSuccess: (data) => {
      console.log('휴대폰 번호 확인 결과 :', data);
    },
    onError: (error) => {
      console.error('휴대폰 번호 중복 확인 에러 :', error);
    }
  });


   // 휴대폰 인증번호 전송
   const sendVerificationCode = useMutation({
    mutationFn: (tel: string) => sendPhoneVerificationCode(tel)
  });

  // 휴대폰 번호 인증 확인
  const verifyPhone = useMutation({
    mutationFn: (data: IVerifyPhoneReq) => verifyPhoneNumber(data)
  });

  // 로그인 요청
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("로그인 성공!! :", res)
      navigate('/'); // 메인 페이지로 이동
    },
    onError: (error) => {
      console.error('로그인 실패 :', error);
    }
  });

  return {
    checkId,
    checkNickname,
    signupMutation,
    checkPhone,
    sendVerificationCode,
    verifyPhone,
    loginMutation
  };
};
