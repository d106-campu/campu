import { useState } from 'react';
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import InputField from "@/components/@common/Input/InputField";
import { IUserProfileUpdate } from '@/types/user';
import ChangePasswordSuccessModal from '@/components/my/profile/ChangePasswordSuccessModal'
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH  } from "@/constants/constants";
import { useUser } from '@/hooks/user/useUser';
import Toast from '@/components/@common/Toast/Toast';

interface IOChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  values: IUserProfileUpdate;
  errors: IUserProfileUpdate;
  setValues: React.Dispatch<React.SetStateAction<IUserProfileUpdate>>;
  setErrors: React.Dispatch<React.SetStateAction<IUserProfileUpdate>>;
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
  const { updatePasswordMutation } = useUser();

  // 비밀번호 input 추적
  const handleChange = (field: keyof typeof values, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // 비밀번호, 비밀번호 확인과 관련하여 유효성 검사
  const validateField = (field: keyof typeof values, value: string) => {
    let message = '';
    switch (field) {
      case 'currentPassword':
        if (value.length < MIN_PASSWORD_LENGTH) {
          message = '기존 비밀번호는 8자 이상입니다.';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
          message = '비밀번호는 영문자, 숫자, 특수문자 조합입니다.';
        } else {
          message = ''; // "알맞은 비밀번호입니다." 문구는 삭제 ->
        }
        break;
      case 'newPassword':
        if (value.length < MIN_PASSWORD_LENGTH) {
          message = '새 비밀번호는 8자 이상이어야 합니다.';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
          message = '영문자, 숫자, 특수문자 조합으로 설정해주세요.';
        } else if (value === values.currentPassword) {
          message = '기존 비밀번호를 설정하실 수 없습니다.'
        } else {
          message = '새 비밀번호가 설정되었습니다.';
        }
        if (values.newPasswordCheck && value !== values.newPasswordCheck) {
          setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
        break;
      case 'newPasswordCheck':
        if (value !== values.newPassword) {
          message = '비밀번호가 일치하지 않습니다.';
        } else if (value === values.currentPassword) {
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
    if (!values.currentPassword || !values.newPasswordCheck || !values.newPassword || values.newPassword !== values.newPasswordCheck) {
      console.error("유효성 검사 통과못함!! :");
      Toast.error('안내 문구를 다시 확인해주세요.');
      return;
    }

    // 비밀번호 수정 API 연결
    updatePasswordMutation.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      newPasswordCheck: values.newPasswordCheck
    }, {
      onSuccess: () => {
        console.log('새로운 비밀번호 설정 완료!!');
        setModalOpacity('opacity-0'); // 모달 투명하게
        setTimeout(() => {
          setSuccessModalOpen(true); // 비밀번호 변경 성공 모달 호출
        }, 10);
      },
      onError: (error) => {
        console.error('비밀번호 변경 실패:', error);
        Toast.error('비밀번호를 변경하지 못했습니다.');
      }
    });
  };

  // 비밀번호 변경 성공 모달이 닫힐 때 호출
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false); // 비밀번호 변경 성공 모달 상태 업데이트
    onClose(); // 비밀번호 변경 모달도 닫기
  };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof typeof values; placeholder: string; maxLength: number; type: string }> = [
    { label: '기존 비밀번호', name: 'currentPassword', placeholder: '기존 비밀번호 입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
    { label: '새 비밀번호', name: 'newPassword', placeholder: '새 비밀번호 입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
    { label: '새 비밀번호 확인', name: 'newPasswordCheck', placeholder: '비밀번호 재입력', maxLength: MAX_PASSWORD_LENGTH, type: 'password' },
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
            value={values[field.name] || ''}
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
              disabled={!values.currentPassword || !values.newPasswordCheck || !values.newPassword || values.newPassword !== values.newPasswordCheck}
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