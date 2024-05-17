import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import profileDefaultImage from "@/assets/images/profile.png";
import Button from "@/components/@common/Button/Button";
import { IUserProfileUpdate } from "@/types/user";
import { ChangePhoneModal } from "@/components/my/profile/ChangePhoneModal";
import { ChangePasswordModal } from "@/components/my/profile/ChangePasswordModal";
import {
  MIN_NICKNAME_LENGTH,
  MAX_NICKNAME_LENGTH,
} from "@/constants/constants";
import { useUser } from "@/hooks/user/useUser";
import { checkNicknameDuplicate } from "@/services/auth/api";
import { setNickname } from "@/features/login/authSlice";

interface IMyProfileProps {
  phoneVerified: boolean;
}

const MyProfile = ({ phoneVerified }: IMyProfileProps): JSX.Element => {
  const dispatch = useDispatch();
  const {
    userProfileQuery,
    updateNickNameMutation,
    updateProfileImageMutation,
    updateDefaultImageMutation,
  } = useUser();
  const profileData = userProfileQuery.data?.data.myProfile;
  const [profileImageUrl, setProfileImageUrl] = useState(profileDefaultImage);

  // 폼 입력 값 상태 관리
  const [values, setValues] = useState<IUserProfileUpdate>({
    account: "",
    nickname: "",
    tel: "",
    profileImageUrl: "",
    newPassword: "",
    currentPassword: "",
    newPasswordCheck: "",
    verifyNums: "",
  });

  // 유효성 통과 실패하면 오류 메세지 관리
  const [errors, setErrors] = useState<IUserProfileUpdate>({
    account: "",
    nickname: "",
    tel: "",
    newPassword: "",
    currentPassword: "",
    newPasswordCheck: "",
  });

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false); // 휴대폰 변경 모달 관리Z
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false); // 비밀번호 변경 모달 관리

  const hasCustomImageRef = useRef<boolean>(false); // 프로필 이미지 변경했는지 추적 관리
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false); // 닉네임 수정 가능 상태 관리
  const [nicknameMessage, setNicknameMessage] = useState<string>(""); // 닉네임 유효성 통과 상태 관리
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] =
    useState<boolean>(false); // 닉네임 유효성 통과 시에 상태 관리

  // 프로필 조회 API 요청 진행
  useEffect(() => {
    if (userProfileQuery.isSuccess && userProfileQuery.data) {
      console.log("프로필 조회 성공");
      const {
        account = "",
        nickname = "",
        tel = "",
      } = userProfileQuery.data.data.myProfile;
      setValues((v) => ({ ...v, account, nickname, tel }));
      dispatch(setNickname(nickname)); // 조회 성공 후 리덕스스토어에 닉네임 업데이트해줌
      // console.log("프로필 사진 :", profileData?.profileImageUrl)
    }
  }, [userProfileQuery.data, userProfileQuery.isSuccess]);

  // 프로필이미지 추출
  useEffect(() => {
    console.log("프로필 사진 :", profileData?.profileImageUrl);
    if (profileData?.profileImageUrl) {
      const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL_PROD;
      console.log(
        "프로필페이지 환경변수 주소 :",
        import.meta.env.VITE_IMAGE_BASE_URL_PROD
      );
      const fullImageUrl = `${profileData.profileImageUrl}`;
      // const fullImageUrl = profileData.profileImageUrl;
      console.log(imageBaseURL);
      setProfileImageUrl(fullImageUrl);
    }
  }, [profileData]);

  // "닉네임"에서 수정 버튼을 클릭해야 수정이 가능하도록
  const handleEditNicknameClick = async () => {
    if (isEditingNickname) {
      // 닉네임 유효성 검사 및 중복 검사를 모두 통과했는지 확인
      if (
        nicknameMessage === "사용 가능한 닉네임입니다." &&
        isSaveButtonEnabled
      ) {
        // 중복 검사 후 닉네임 업데이트
        const checkResult = await checkNicknameDuplicate(values.nickname);
        if (checkResult.data.available) {
          // 닉네임 변경 API 호출
          updateNickNameMutation.mutate(
            {
              nickname: values.nickname,
            },
            {
              onSuccess: () => {
                console.log("닉네임 변경 성공@@");
                dispatch(setNickname(values.nickname));
                setIsEditingNickname(false); // 편집 상태 해제
                setNicknameMessage("");
                setErrors((prev) => ({
                  ...prev,
                  nickname: "닉네임이 변경되었습니다 !",
                }));
              },
              onError: (error) => {
                console.error("닉네임 변경 중 오류 발생:", error);
                setNicknameMessage(
                  "닉네임 변경에 실패했습니다. 다시 시도해주세요."
                );
              },
            }
          );
        } else {
          setNicknameMessage("이미 사용 중인 닉네임입니다.");
        }
      }
    } else {
      setIsEditingNickname(true); // 닉네임 수정 모드 활성화
      setNicknameMessage("");
    }
  };

  // "닉네임" 수정 시 input 추적해서 유효성 검사
  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, nickname: value }));
    validateField("nickname", value); // 닉네임 유효성 검사와 연결
    setIsSaveButtonEnabled(nicknameMessage === "사용 가능한 닉네임입니다.");
  };

  // 실시간 사용자가 입력하는 프로필 수정 input 값 유효성 검사
  const validateField = async (
    field: keyof IUserProfileUpdate,
    value: string
  ) => {
    let message = "";
    if (value) {
      switch (field) {
        case "nickname":
          if (
            value.length < MIN_NICKNAME_LENGTH ||
            value.length > MAX_NICKNAME_LENGTH
          ) {
            message = "닉네임은 2~8자 이내로 해주세요.";
          } else if (!/^[가-힣a-zA-Z0-9]+$/.test(value)) {
            message = "특수문자, 띄워쓰기는 사용할 수 없습니다.";
          } else {
            const res = await checkNicknameDuplicate(value);
            message = res.data.available
              ? "사용 가능한 닉네임입니다."
              : "이미 사용 중인 닉네임입니다.";
            setIsSaveButtonEnabled(res.data.available);
          }
          setNicknameMessage(message);
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // 휴대폰 번호 변경 모달 열기
  const handlePhoneModalOpen = () => {
    setIsPhoneModalOpen(true);
  };

  // 휴대폰 번호 변경 모달 닫기
  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
    // 모달이 닫힐 때 휴대폰 번호와 인증번호 관련 상태 및 오류 상태 초기화
    setValues((prev) => ({
      ...prev,
      tel: "",
      verifyNums: "",
    }));
    setErrors((prev) => ({
      ...prev,
      tel: "",
      verifyNums: "",
    }));
  };

  // 비밀번호 변경 모달 열기
  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  // 비밀번호 변경 모달 닫기
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    // 모달 닫힐 때 비밀번호, 비밀번호 확인 관련 상태와 오류 메세지 초기화
    setValues((prev) => ({
      ...prev,
      newPassword: "",
      currentPassword: "",
      newPasswordCheck: "",
    }));
    setErrors((prev) => ({
      ...prev,
      newPassword: "",
      currentPassword: "",
      newPasswordCheck: "",
    }));
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // 선택된 파일

    if (file) {
      updateProfileImageMutation.mutate(file, {
        onSuccess: (data) => {
          // 서버로부터 반환된 이미지 URL을 리덕스 스토어에 저장
          // dispatch(setIsProfileImage(data.data.profileImage));
          console.log("프로필이미지 수정한거 전달!!", data);
        },
        onError: (error) => {
          console.error("프로필 이미지 업데이트 실패:", error.message);
        },
      });
    }
  };

  // "기본 사진" 버튼 클릭 시
  const handleSetDefaultImage = () => {
    hasCustomImageRef.current = false; // 사용자가 이미지를 기본으로 변경했음을 추적
    updateDefaultImageMutation.mutate(undefined, {
      onSuccess: () => {
        setProfileImageUrl(profileDefaultImage); // 기본 이미지로 변경
        console.log("기본 사진으로 변경 딸깍!!!");
        userProfileQuery.refetch();
      },
      onError: (error) => {
        console.error("기본 사진으로 변경 실패:", error.message);
      },
    });
  };

  // 유효성 검사 Field에 대해 값들을 처리
  useEffect(() => {
    Object.keys(values).forEach((field) => {
      const key = field as keyof IUserProfileUpdate;
      const value = values[key];

      // undefined가 아닐 때만 유효성 검사를 수행
      if (value !== undefined) {
        validateField(key, value);
      }
    });
  }, [phoneVerified]);

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      {/* 프로필 수정 헤더 */}
      <div className="flex flex-col pb-4">
        <h1 className="text-lg font-bold">프로필 설정</h1>
        <h1 className="text-sm text-gray-400">
          {values.nickname}님의 프로필을 변경할 수 있습니다.
        </h1>
      </div>

      {/* 아이디 + 닉네임 */}
      <div className="w-full flex justify-between">
        <div className="w-[50%] flex flex-col">
          <div className="pb-5">
            <h1 className="pb-2">아이디</h1>
            <input
              type="text"
              className="w-full h-[35px] pl-2 outline-none border-gray-300 rounded-md bg-gray-100 "
              disabled // 수정 불가능하게 막기
              value={values.account || ""}
            />
          </div>
          <div className="pb-5">
            <div className="flex justify-between">
              <h1 className="pb-2">닉네임</h1>
              {/* 수정 또는 저장 버튼 제공 */}
              {isEditingNickname ? (
                <button
                  onClick={handleEditNicknameClick}
                  className="hover:text-MAIN_GREEN text-sm"
                  disabled={!isEditingNickname || !isSaveButtonEnabled}
                >
                  저 장
                </button>
              ) : (
                <button
                  onClick={handleEditNicknameClick}
                  className="hover:text-MAIN_GREEN text-sm"
                >
                  수 정
                </button>
              )}
            </div>
            <input
              type="text"
              className={`w-full h-[35px] pl-2 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 border-gray-300 rounded-md ${
                isEditingNickname ? "" : "pointer-events-none"
              }`}
              disabled={!isEditingNickname}
              maxLength={MAX_NICKNAME_LENGTH}
              value={values.nickname || ""}
              onChange={handleChangeNickname}
            />
            <p
              className={`pl-2 pt-2 text-xs flex justify-end items-center ${
                // eslint-disable-next-line no-constant-condition
                nicknameMessage === "사용 가능한 닉네임입니다." ||
                "닉네임이 변경되었습니다 !"
                  ? "text-MAIN_GREEN"
                  : "text-red-500"
              }`}
            >
              {errors.nickname}
            </p>
          </div>
        </div>
        {/* 프로필 이미지 */}
        <div className="w-[50%] flex flex-col items-center justify-center pr-10 pt-1">
          <img
            src={profileImageUrl || profileDefaultImage}
            alt="프로필 이미지"
            className="w-[150px] h-[150px] object-cover object-center rounded-full"
          />
          <div className="pt-2 flex justify-center">
            <div className="px-2">
              <Button
                text="사진 변경"
                width="w-full"
                backgroundColor="bg-SUB_GREEN_01"
                textColor="text-MAIN_GREEN"
                hoverTextColor="text-green-700"
                hoverBackgroundColor="hover:bg-SUB_GREEN_02"
                padding="p-2"
                fontWeight="none"
                onClick={() => {
                  document.getElementById("imageUpload")?.click();
                }}
              />
            </div>
            {/* 만약 이미지를 한번이라도 바꿨다면 "기본 사진"으로 바꿀 수 있는 버튼 제공 */}
            <div>
              {profileData?.profileImageUrl !== profileDefaultImage && (
                <Button
                  text="기본 사진"
                  width="w-full"
                  backgroundColor="bg-SUB_GREEN_01"
                  textColor="text-MAIN_GREEN"
                  hoverTextColor="text-green-700"
                  hoverBackgroundColor="hover:bg-SUB_GREEN_02"
                  padding="p-2"
                  fontWeight="none"
                  onClick={() => {
                    handleSetDefaultImage(); // 사용자가 이미지를 기본으로 변경했음을 추적
                    // dispatch(setIsProfileImage(profileDefaultImage));
                  }}
                />
              )}
            </div>
          </div>
          {/* 이미지 업로드 */}
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload} // 파일 선택 시 이미지 업로드 핸들러 호출
          />
        </div>
      </div>

      {/* 휴대폰 번호 */}
      <div className="w-full flex flex-col pb-5">
        <h1 className="pb-2">휴대폰 번호</h1>
        <div className="flex items-center justify-start">
          <input
            type="text"
            className="w-[25%] h-[35px] pl-2 outline-none rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 border-gray-300"
            disabled
            value={values.tel || ""}
          />
          <div className="pl-5 flex items-center  justify-center">
            <Button
              text="전화번호 변경"
              width="w-full"
              backgroundColor="bg-SUB_GREEN_01"
              textColor="text-MAIN_GREEN"
              hoverTextColor="text-green-700"
              hoverBackgroundColor="hover:bg-SUB_GREEN_02"
              padding="p-2"
              fontWeight="none"
              onClick={handlePhoneModalOpen}
            />
          </div>
        </div>
      </div>

      {/* 휴대폰 번호 변경 모달 호출 */}
      {isPhoneModalOpen && (
        <ChangePhoneModal
          isOpen={isPhoneModalOpen}
          onClose={handlePhoneModalClose}
          phoneVerified={phoneVerified}
          values={values}
          errors={errors}
          setValues={setValues}
          setErrors={setErrors}
        />
      )}

      {/* 비밀번호 */}
      <div className="pb-10">
        <h1 className="pb-2">비밀번호</h1>
        <button
          className="h-[35px] p-2 rounded-md text-sm text-MAIN_GREEN hover:text-green-700 bg-SUB_GREEN_01 hover:bg-SUB_GREEN_02"
          onClick={handleOpenPasswordModal}
        >
          비밀번호 변경
        </button>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
          values={values}
          errors={errors}
          setValues={setValues}
          setErrors={setErrors}
        />
      )}
    </div>
  );
};

export default MyProfile;
