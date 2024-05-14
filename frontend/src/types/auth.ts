export interface ILoginFormValues {
  id: string;
  password: string;
}

export interface ISignUpFormValues extends ILoginFormValues {
  nickName: string;
  confirmPassword: string;
  phone: string;
}

// 로그인 요청 타입
export interface ILoginReq {
  account: string;
  password: string;
}

// 로그인 응답 타입
export interface ILoginRes {
  result: string;
  data: {
    user: {
      nickname: string;
      profileImageUrl: string;
      role: string;
    };
  };
}

// 아이디 중복 검사 API 요청
export interface ICheckIdReq {
  account: string;
}

// 아이디 중복 검사에 대한 API 응답
export interface ICheckIdRes {
  available: boolean;
}

// 닉네임 중복 검사 API 요청
export interface ICheckNicknameReq {
  nickname: string;
}

// 닉네임 중복 검사에 대한 API 응답
export interface ICheckNicknameRes {
  available: boolean;
}

// 사용자 회원가입을 위한 API 요청
export interface ISignUpReq {
  account: string;
  nickname: string;
  password: string;
  tel: string;
  passwordCheck: string;
}

// 사용자 회원가입 요청에 대한 API 응답
export interface ISignUpRes {
  userId: number;
  success: boolean;
}

// 사용자 휴대폰 번호 인증 API 요청
export interface IVerifyPhoneReq {
  tel: string;
  authorizationCode: number;
}

// 사용자 휴대폰 번호 인증 요청에 대한 API 응답
export interface IVerifyPhoneRes {
  verify: boolean;
}