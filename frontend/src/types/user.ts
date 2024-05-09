// 프로필 조회 요청
export interface IUserProfile {
  account?: string;
  nickname: string;
  tel: string;
}

// 프로필 조회에 대한 API 응답
export interface IUserProfileRes {
  myProfile: IUserProfile;
}

// 프로필 업데이트
export interface IUserProfileUpdate extends IUserProfile {
  currentPassword?: string;
  newPassword?: string;
  newPasswordCheck?: string;
  verifyNums?: string; 
}

// 유저 닉네임 수정 API 요청
export interface IUserNickNameUpdate {
  nickname: string;
}

// 유저 휴대폰 번호 수정 API 요청
export interface IUserPhoneUpdate {
  tel: string;
}

// 유저 비밀번호 수정 API 요청
export interface IUserPasswordUpdate {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}