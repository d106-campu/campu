export interface ILoginFormValues {
  id: string;
  password: string;
}

export interface ISignUpFormValues extends ILoginFormValues {
  nickName: string;
  confirmPassword: string;
  phone: string;
}
