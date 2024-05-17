import { useState, useEffect } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import InputField from "@/components/@common/Input/InputField";
import { IUserProfileUpdate } from "@/types/user";
import ChangePhoneSuccessModal from "@/components/my/profile/ChangePhoneSuccessModal";
import { PHONE_LENGTH, PHONE_VERIFY_LENGTH } from "@/constants/constants";
import { useUser } from "@/hooks/user/useUser";
import { useSignup } from "@/hooks/auth/useSignup";
import Toast from "@/components/@common/Toast/Toast";

interface IChangePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneVerified: boolean;
  values: IUserProfileUpdate;
  errors: IUserProfileUpdate;
  setValues: React.Dispatch<React.SetStateAction<IUserProfileUpdate>>;
  setErrors: React.Dispatch<React.SetStateAction<IUserProfileUpdate>>;
}

export const ChangePhoneModal = ({
  isOpen,
  onClose,
  phoneVerified,
  values,
  errors,
  setValues,
  setErrors,
}: IChangePhoneModalProps) => {
  const [modalOpacity, setModalOpacity] = useState<string>("opacity-100"); // 모달 투명도 상태 관리
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false); // 휴대폰 번호 변경 성공 모달 상태 관리
  const [isPhoneAvailable, setIsPhoneAvailable] = useState<boolean>(true); // 중복 검사 통과 상태 관리
  const { updatePhoneMutation } = useUser();
  const { sendVerificationCode, checkPhone, verifyPhone } = useSignup();

  // 새 폰 번호 유효성 검사 로직
  const validateField = (field: keyof IUserProfileUpdate, value: string) => {
    let message = "";
    if (value) {
      switch (field) {
        case "tel":
          if (!/^\d{11}$/.test(value)) {
            message = "휴대폰 번호는 11자리 숫자여야 합니다.";
          } else if (isPhoneAvailable) {
            // console.log("중복 통과 못했음 ㅋ");
            message = "이미 등록된 휴대전화 번호입니다.";
          } else {
            message = "인증번호 전송 버튼을 눌러주세요 !";
          }
          break;
        case "verifyNums":
          if (!/^\d{6}$/.test(value)) {
            message = "인증번호는 6자리 숫자여야 합니다.";
          } else {
            message = "인증 버튼을 눌러주세요 !";
          }
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // 휴대폰 번호 적는 input 추적
  const handleChange = (
    field: keyof IUserProfileUpdate,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // 휴대폰 번호 적는 곳 + 인증번호 적는 곳에는 숫자만 입력하도록 함
    if (
      (field === "tel" || field === "verifyNums") &&
      (value === "" || /^\d+$/.test(value))
    ) {
      setValues((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    } else if (field !== "tel" && field !== "verifyNums") {
      setValues((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    }
  };

  // "인증번호 전송" 버튼 클릭과 관련하여 세밀한 유효성 검사
  const handleCertificationClick = async () => {
    if (values.tel.length === PHONE_LENGTH) {
      // 휴대폰 번호 중복 확인 요청 API 호출 -> checkPhone 호출
      checkPhone.mutate(values.tel, {
        onSuccess: (res) => {
          // console.log('중복 확인 요청 수행함!!!')
          if (res.data.available) {
            // 번호 중복 검사가 통과하면 인증번호 전송 api 요청 -> sendVerificationCode 호출
            sendVerificationCode.mutate(values.tel, {
              onSuccess: () => {
                setIsPhoneAvailable(true); // 중복 검사도 오케이
              },
              onError: (error) => {
                console.error("인증 번호 전송 실패:", error); // 같은 번호로 연속해서 3번까지만 전송되도록 함
                Toast.error("연속적인 인증 요청으로 인해 중단되었습니다.");
                setErrors((prev) => ({
                  ...prev,
                  tel: "잠시 후에 다시 시도해주세요.",
                }));
              },
            });
          } else {
            setErrors((prev) => ({
              ...prev,
              tel: "이미 등록된 휴대폰 번호입니다.",
            }));
            setIsPhoneAvailable(false); // 중복 검사 통과 못함
          }
        },
        onError: (error) => {
          console.error("휴대폰 번호 중복 확인 에러:", error);
          setErrors((prev) => ({
            ...prev,
            tel: "휴대폰 인증을 실패했습니다. 다시 확인해주세요.",
          }));
        },
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tel: "휴대폰 번호는 11자리 숫자여야 합니다.",
      }));
    }
  };

  // 휴대폰 번호 변경 성공 모달이 닫힐 때 호출
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false); // 비밀번호 변경 성공 모달 상태 업데이트
    onClose(); // 휴대폰 번호 변경 모달도 닫기
  };

  // 휴대폰 전송 버튼 작동시키기
  const phoneCertificationButton = (
    <Button
      text="인증번호 전송"
      disabled={phoneVerified} // 인증 성공 시 버튼 비활성화하기
      textSize="text-[12.5px]"
      width="w-20"
      height="h-8"
      onClick={handleCertificationClick} // 클릭하여 인증번호 입력 모달 열기
      textColor="text-white"
      borderRadius="rounded-md"
      visible={!phoneVerified}
    />
  );

  // 입력된 인증번호 확인
  const handleVerification = () => {
    if (values.verifyNums && values.verifyNums.length === 6) {
      // 인증 번호 확인 요청을 위한 데이터 구성 -> 인증번호 코드는 반드시 6자리
      const requestData = {
        tel: values.tel,
        authorizationCode: parseInt(values.verifyNums),
      };
      // 인증번호 검증 요청 API 연결
      verifyPhone.mutate(requestData, {
        onSuccess: (response) => {
          const isVerified = response.data.verify;
          if (isVerified) {
            setErrors((prev) => ({ ...prev, verifyNums: "인증 성공!" }));
            // 검증 요청 성공하면 휴대폰 번호 수정 API 연결
            updatePhoneMutation.mutate(
              { tel: values.tel },
              {
                onSuccess: () => {
                  setModalOpacity("opacity-0");
                  setTimeout(() => {
                    setSuccessModalOpen(true); // 비밀번호 변경 성공 모달 호출하기
                  }, 10); // 0.01초정도로 부드럽게 처리
                },
                onError: (error) => {
                  Toast.error("휴대폰 번호 변경에 실패했습니다.");
                  console.error("휴대폰 번호 변경 실패:", error);
                },
              }
            );
          } else {
            setErrors((prev) => ({
              ...prev,
              verifyNums: "인증번호가 일치하지 않습니다.",
            }));
          }
        },
        onError: (error) => {
          console.error("인증 실패: ", error);
          setErrors((prev) => ({
            ...prev,
            verifyNums: "인증 과정에서 오류가 발생했습니다.",
          }));
        },
      });
    } else {
      setErrors((prev) => ({
        ...prev,
        verifyNums: "인증번호는 6자리 숫자여야 합니다.",
      }));
    }
  };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{
    label: string;
    name: keyof IUserProfileUpdate;
    placeholder: string;
    maxLength: number;
    type: string;
  }> = [
    {
      label: "새로운 휴대폰 번호",
      name: "tel",
      placeholder: "새로운 휴대폰 번호 입력",
      maxLength: PHONE_LENGTH,
      type: "text",
    },
    {
      label: "본인 인증을 위해 새 번호로 전송된 인증번호를 입력해주세요.",
      name: "verifyNums",
      placeholder: "새 인증번호를 입력해주세요.",
      maxLength: PHONE_VERIFY_LENGTH,
      type: "text",
    },
  ];

  // phoneVerified 값 바뀔때마다 유효성 검사 작동
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

  // 처음 열렸을 때, 휴대폰 번호와 인증번호를 빈 문자열로 초기화
  useEffect(() => {
    if (isOpen) {
      setValues((prev) => ({ ...prev, tel: "", verifyNums: "" }));
      setErrors((prev) => ({ ...prev, tel: "", verifyNums: "" })); // 에러 메시지도 초기화
    }
  }, [isOpen, setValues, setErrors]);

  return (
    <>
      <Modal
        width="w-[500px]"
        onClose={onClose}
        title="휴대폰 번호 변경"
        opacity={modalOpacity}
      >
        {/* 모달 내용 */}
        <div className="p-5">
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e)}
              placeholder={field.placeholder}
              error=""
              changeError={errors[field.name]}
              maxLength={field.maxLength}
              certificationButton={
                field.name === "tel" ? phoneCertificationButton : undefined
              }
            />
          ))}
          <div className="flex justify-center">
            <div>
              <Button text="재전송" backgroundColor="bg-GRAY" />
            </div>
            <div className="pl-4">
              <Button
                text="인 증"
                onClick={handleVerification}
                disabled={!values.tel || !values.verifyNums}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* 휴대폰 번호 변경 성공 시 모달 호출 */}
      {successModalOpen && (
        <ChangePhoneSuccessModal
          isOpen={successModalOpen}
          onClose={handleSuccessModalClose}
        />
      )}
    </>
  );
};
