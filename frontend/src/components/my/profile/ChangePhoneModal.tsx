import { useState, useEffect } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import InputField from "@/components/@common/Input/InputField";
import { IMyPhoneValues } from '@/types/profile';
import ChangePhoneSuccessModal from "@/components/my/profile/ChangePhoneSuccessModal";
import { PHONE_LENGTH, PHONE_VERIFY_LENGTH  } from "@/constants/constants";

interface IChangePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneVerified: boolean;
  values: IMyPhoneValues;
  errors: IMyPhoneValues;
  setValues: React.Dispatch<React.SetStateAction<IMyPhoneValues>>;
  setErrors: React.Dispatch<React.SetStateAction<IMyPhoneValues>>;
}

export const ChangePhoneModal = ({
  onClose,
  phoneVerified,
  values,
  errors,
  setValues,
  setErrors
}: IChangePhoneModalProps) => {
  const [modalOpacity, setModalOpacity] = useState<string>('opacity-100'); // 모달 투명도 상태 관리
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false); // 휴대폰 번호 변경 성공 모달 상태 관리

  // 새 폰 번호 유효성 검사 로직
  const validateField = (field: keyof IMyPhoneValues, value: string) => {
    let message = '';
    if (value) {
      switch (field) {
        case 'phone':
          if (!/^\d{11}$/.test(value)) {
            message = '휴대폰 번호는 11자리 숫자여야 합니다.';
          } else {
            message = '인증번호 전송 버튼을 눌러주세요 !';
          }
          break;
        case 'verifyNums':
          if (!/^\d{6}$/.test(value)) {
            message = '인증번호는 6자리 숫자여야 합니다.';
          } else {
            message = '인증 버튼을 눌러주세요 !';
          }
          break;
      }
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // 휴대폰 번호 적는 input 추적
  const handleChange = (field: keyof IMyPhoneValues, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 휴대폰 번호 적는 곳에는 숫자만 입력하도록 함
    if (field === 'phone' && value === '' || /^\d+$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    } else if (field !== 'phone') {
      setValues(prev => ({ ...prev, [field]: value }));
      validateField(field, value); 
    }
  };

  // "인증번호 전송" 버튼 클릭과 관련하여 세밀한 유효성 검사
  const handleCertificationClick = () => {
    if (values.phone.length === PHONE_LENGTH) {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: '인증번호를 전송했습니다 !'
        // @TODO : 벡엔드와 연결하여 실제로 SMS 문자 보내야함
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: '휴대폰 번호는 11자리 숫자여야 합니다.'
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
      textSize='text-[12.5px]'
      width='w-20'
      height='h-8'
      onClick={handleCertificationClick} // 클릭하여 인증번호 입력 모달 열기
      textColor="text-white"
      borderRadius="rounded-md"
      visible={!phoneVerified}
    />
  )

  // 입력된 인증번호 확인
  const handleVerification = () => {
    // @TODO : 일단은 123456으로 설정 -> 추후에 백엔드 연결 후 수정
    if (values.verifyNums === "123456") {
      setErrors(prev => ({ ...prev, verifyNums: "인증 성공!" }));
      console.log("여기서 인증번호 확인 :", values.verifyNums)
      setModalOpacity('opacity-0'); // 이 모달은 투명하게 만들면서
      setTimeout(() => {
        setSuccessModalOpen(true); // 비밀번호 변경 성공 모달 호출하기
      }, 10) // 0.01초정도로 부드럽게 처리
    } else {
      setErrors(prev => ({ ...prev, verifyNums: "인증번호가 일치하지 않습니다." }));
      console.log("여기서 틀린 인증번호 확인 :", values.verifyNums)
    }
  };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof IMyPhoneValues; placeholder: string; maxLength: number; type: string }> = [
    { label: '새로운 휴대폰 번호', name: 'phone', placeholder: '새로운 휴대폰 번호 입력', maxLength: PHONE_LENGTH, type: 'text'},
    { label: '본인 인증을 위해 새 번호로 전송된 인증번호를 입력해주세요.', name: 'verifyNums', placeholder: '새 인증번호를 입력해주세요.', maxLength: PHONE_VERIFY_LENGTH, type: 'text'  },
  ];

  // phoneVerified 값 바뀔때마다 유효성 검사 작동
  useEffect(() => {
    Object.keys(values).forEach((field) => {
      validateField(field as keyof IMyPhoneValues, values[field as keyof IMyPhoneValues]);
    });
  }, [phoneVerified]);

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
          {fields.map(field => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={values[field.name]}
              onChange={e => handleChange(field.name, e)}
              placeholder={field.placeholder}
              error=""
              changeError={errors[field.name]}
              maxLength={field.maxLength}
              certificationButton={field.name === 'phone' ? phoneCertificationButton : undefined }
            />
          ))}
          <div className="flex justify-center">
            <div>
              <Button
                text='재전송'
                backgroundColor="bg-GRAY"
              />
            </div>
            <div className="pl-4">
              <Button
                text='인 증'
                onClick={handleVerification}
                disabled={!values.phone || !values.verifyNums}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* 휴대폰 번호 변경 성공 시 모달 호출 */}
      {successModalOpen && (
        <ChangePhoneSuccessModal isOpen={successModalOpen} onClose={handleSuccessModalClose} />
      )}
    </>
  );
};