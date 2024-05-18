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
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '@/features/login/authSlice';

export const useSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 아이디 중복 검사
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const checkId = (account: string) => useQuery({
    queryKey: ['당신의 아이디 확인! :', account],
    queryFn: () => checkIdDuplicate(account)
  });

  // 닉네임 중복 검사
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const checkNickname = (nickname: string) => useQuery({
    queryKey: ['당신의 닉네임 확인! :', nickname],
    queryFn: () => checkNicknameDuplicate(nickname)
  });

  // 회원가입 요청
  const signupMutation = useMutation({
    mutationFn: (data: ISignUpReq) => postSignUp(data),
    onSuccess: res => {
      console.log("회원가입 성공 :", res)
    },
    onError: (error) => {
      console.error('회원가입 에러 :', error);
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
      console.log("로그인 성공!!")
      
      dispatch(setRole(res.data.user.role)) // 유저 권한
      console.log("유저 권한 확인:", res.data.user.role)

      const from = location.state?.from?.pathname || '/';
      console.log('이전 페이지 확인 :', from)
      // 이전 페이지로 이동 (저장된 이전페이지 경로가 없으면 메인페이지로)
      navigate(from, { replace: true });
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
