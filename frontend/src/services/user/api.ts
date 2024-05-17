import { axiosAuthInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IUserProfileRes,
  IUserNickNameUpdate,
  IUserPhoneUpdate,
  IUserPasswordUpdate,
  IUserProfileImageRes,
} from "@/types/user";

// 로그인 상태 확인 함수
const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

// 내 프로필 조회
export const fetchUserProfile = async (): Promise<
  APIResponse<IUserProfileRes>
> => {
  if (!isUserLoggedIn()) {
    return Promise.reject(new Error("로그인 시에만 api 호출"));
  }

  const response = await axiosAuthInstance.get("/mypage/profile");
  return response.data;
};

// 닉네임 수정 요청
export const updateUserNickName = async (
  data: IUserNickNameUpdate
): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post(
    "/mypage/profile/nickname",
    null,
    { params: { nickname: data.nickname } }
  );
  return response.data;
};

// 비밀번호 수정 요청
export const updateUserPassword = async (
  data: IUserPasswordUpdate
): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post(
    "/mypage/profile/password",
    data
  );
  return response.data;
};

// 휴대폰 번호 수정 요청
export const updateUserPhone = async (
  data: IUserPhoneUpdate
): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.post("/mypage/profile/tel", null, {
    params: { tel: data.tel },
  });
  return response.data;
};

// 프로필 이미지 업로드 요청
export const updateProfileImage = async (
  imageFile: File
): Promise<APIResponse<IUserProfileImageRes>> => {
  // 이미지는 폼데이터로 만들어서 보내기
  const formData = new FormData();
  formData.append("profileImage", imageFile);

  // 이미지 파일은 Content-Type을 따로 설정하여 파일이 올바르게 전송하도록 함
  const response = await axiosFileInstance.post(
    "/image/user/profile",
    formData
  );
  return response.data;
};

export const updateDefaultImage = async (
): Promise<APIResponse<{ result: string }>> => {
  const response = await axiosAuthInstance.delete("/image/user/profile")
  return response.data
}
