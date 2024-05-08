import { useState } from 'react';
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import InputField from "@/components/@common/Input/InputField";
import { IMyPhoneValues } from '@/types/profile';
import ChangePasswordSuccessModal from '@/components/my/profile/ChangePasswordSuccessModal'
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH  } from "@/constants/constants";

interface IOChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  values: IMyPhoneValues;
  errors: IMyPhoneValues;
  setValues: React.Dispatch<React.SetStateAction<IMyPhoneValues>>;
  setErrors: React.Dispatch<React.SetStateAction<IMyPhoneValues>>;
}

export const ChangePasswordModal = ({
  onClose,
  values,
  errors,
  setValues,
  setErrors
}: IOChangePasswordModalProps): JSX.Element => {
  const [modalOpacity, setModalOpacity] = useState<string>('opacity-100'); // 모달 투명도 상태 관리
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false); // 비밀번호 변경 성공 모달 상태 관리
  // 비밀번호 input 추적
  const handleChange = (field: keyof typeof values, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // 비밀번호, 비밀번호 확인과 관련하여 유효성 검사
  const validateField = (field: keyof typeof values, value: string) => {
    let message = '';
    switch (field) {
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          message = '기존 비밀번호는 8자 이상입니다.';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
          message = '비밀번호는 영문자, 숫자, 특수문자 조합입니다.';
        } else {
          message = '알맞은 비밀번호를 입력했습니다.';
        }
        break;
      case 'newPassword':
        if (value.length < MIN_PASSWORD_LENGTH) {
          message = '새 비밀번호는 8자 이상이어야 합니다.';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
          message = '영문자, 숫자, 특수문자 조합으로 설정해주세요.';
        } else if (value === values.password) {
          message = '기존 비밀번호를 설정하실 수 없습니다.'
        } else {
          message = '새 비밀번호가 설정되었습니다.';
        }
        if (values.confirmPassword && value !== values.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
        break;
      case 'confirmPassword':
        if (value !== values.newPassword) {
          message = '비밀번호가 일치하지 않습니다.';
        } else if (value === values.password) {
          message = '기존 비밀번호를 설정하실 수 없습니다.'
        } else {
          message = '새 비밀번호와 일치합니다.';
        }
        break;
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // "변경하기" 버튼 제출에 대한 검사
  const handleSubmit = () => {
    if (!values.password || !values.confirmPassword || !values.newPassword || values.newPassword !== values.confirmPassword) {
      console.error("유효성 검사 통과못했어요!!");
      return;
    }
    console.log('새로운 비밀번호 설정 완료!!');
    setModalOpacity('opacity-0'); // 이 모달은 투명하게 만들면서
    setTimeout(() => {
      setSuccessModalOpen(true); // 비밀번호 변경 성공 모달 호출하기
    }, 10) // 0.01초정도로 부드럽게 처리
  };

  // 비밀번호 변경 성공 모달이 닫힐 때 호출
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false); // 비밀번호 변경 성공 모달 상태 업데이트
    onClose(); // 비밀번호 변경 모달도 닫기
  };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof typeof values; placeholder: string; maxLength: number; type: string }> = [
    { label: '기존 비밀번호', name: 'password', placeholder: '기존 비밀번호 입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
    { label: '새 비밀번호', name: 'newPassword', placeholder: '새 비밀번호 입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
    { label: '새 비밀번호 확인', name: 'confirmPassword', placeholder: '비밀번호 재입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
  ];


  return (
    <>
      <Modal
        width="w-[500px]"
        onClose={onClose}
        title="비밀번호 변경"
        opacity={modalOpacity}
      >
        <div className="p-5">
        {fields.map(field => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            error=""
            changeError={errors[field.name]}
            maxLength={field.maxLength}
          />
        ))}
          <div className="flex justify-center pt-3">
            <Button
              text="변경하기"
              onClick={handleSubmit}
              disabled={!values.password || !values.confirmPassword || !values.newPassword || values.newPassword !== values.confirmPassword}
            />
          </div>
        </div>
      </Modal>

      {/* 비밀번호 변경 성공 시 모달 호출 */}
      {successModalOpen && (
        <ChangePasswordSuccessModal isOpen={successModalOpen} onClose={handleSuccessModalClose} />
      )}
    </>
  );
};