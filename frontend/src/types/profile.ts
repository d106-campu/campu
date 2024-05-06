export interface IMyProfileValues {
  nickName: string;
  password: string;
}

export interface IMyPhoneValues extends IMyProfileValues {
  newPassword: string;
  confirmPassword: string;
  phone: string;
  verifyNums: string;
}
