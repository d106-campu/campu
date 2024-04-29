import React, { useState } from 'react';
import Modal from '@/components/@common/Modal/Modal';
import InputField from '@/components/@common/Input/InputField';
import Button from '@/components/@common/Button/Button';

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordRecoveryModal = ({ onClose }: PasswordRecoveryModalProps) => {
  const [userId, setUserId] = useState<string>(''); // 아이디 입력 상태 관리
  const [phone, setPhone] = useState<string>(''); // 휴대폰 번호 입력 상태 관리
  const [userIdError, setUserIdError] = useState<string>(''); // 잘못 친 아이디 오류메세지 관리
  const [phoneError, setPhoneError] = useState<string>(''); // 잘못 친 번호 오류메세지 관리

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const validateFields = () => {
    let isValid = true;
    if (!userId) {
      setUserIdError('아이디를 입력해주세요.');
      isValid = false;
    } else if (userId.length < 6) {
      setUserIdError('아이디는 6자리 이상입니다.');
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      setUserIdError('아이디는 영문자와 숫자 조합입니다.');
      isValid = false;
    } else {
      setUserIdError('');
    }

    if (!phone || phone.length !== 11) {
      setPhoneError('휴대폰 번호는 11자리 숫자여야 합니다.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      // @TODO : 여기서 백엔드 API 호출하여 ID와 휴대폰 번호 검증
      // @TODO : 비밀번호 정보를 반환 또는 재설정 절차 안내
      console.log('올바른 아이디와 번호 입력함', userId, phone);
      onClose();
    }
  };

  return (
    <Modal width="w-1/3" onClose={onClose} title='비밀번호 찾기'>
      <div className="flex flex-col items-center p-8">
        {/* <h2 className="text-lg font-semibold mb-4">비밀번호 찾기</h2> */}
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <InputField
            label="아이디"
            type="text"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="사용자 ID를 입력하세요"
            error={userIdError}
          />
          <InputField
            label="휴대폰 번호"
            type="tel"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="휴대폰 번호를 입력하세요"
            error={phoneError}
            maxLength={11}
          />
          <div className="pt-5">
            <Button
              type="submit"
              text="임시 비밀번호 발급"
              textSize="text-md"
              width="w-full"
              borderRadius="rounded-md" />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PasswordRecoveryModal;