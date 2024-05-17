import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateUserNickName,
  updateUserPassword,
  updateUserPhone,
  updateProfileImage,
} from "@/services/user/api";
import {
  IUserNickNameUpdate,
  IUserPasswordUpdate,
  IUserPhoneUpdate,
} from "@/types/user";
import Toast from "@/components/@common/Toast/Toast";

export const useUser = () => {
  // 프로필 조회
  const userProfileQuery = useQuery({
    queryKey: ["my"],
    queryFn: fetchUserProfile,
  });

  // 닉네임 변경
  const updateNickNameMutation = useMutation({
    mutationFn: (data: IUserNickNameUpdate) => updateUserNickName(data),
    onSuccess: () => {
      userProfileQuery.refetch();
    },
    onError: (error) => {
      console.error("닉네임 변경 실패 :", error);
    },
  });

  // 비밀번호 변경
  const updatePasswordMutation = useMutation({
    mutationFn: (data: IUserPasswordUpdate) => updateUserPassword(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error("비밀번호 변경 실패 :", error);
    },
  });

  // 휴대폰 번호 변경
  const updatePhoneMutation = useMutation({
    mutationFn: (data: IUserPhoneUpdate) => updateUserPhone(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error("휴대폰 번호 변경 실패:", error);
    },
  });

  // 프로필 이미지 업데이트
  const updateProfileImageMutation = useMutation({
    mutationFn: (file: File) => updateProfileImage(file),
    onSuccess: () => {
      userProfileQuery.refetch();
      Toast.success("프로필 이미지가 수정되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 이미지 수정 실패:", error);
      Toast.error("프로필 이미지 수정에 실패했습니다.");
    },
  });

  return {
    userProfileQuery,
    updateNickNameMutation,
    updatePasswordMutation,
    updatePhoneMutation,
    updateProfileImageMutation,
  };
};
