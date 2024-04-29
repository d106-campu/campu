import { useState } from 'react';
import Button from '@/components/@common/Button/Button';
import Modal from '@/components/@common/Modal/Modal';

interface CertificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: boolean) => void;
}

const Certification = ({ isOpen, onClose, onVerify }: CertificationProps) => {
  const [isCode, setIsCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleVerifyClick = () => {
    if (isCode.length === 6) {
      onVerify(isCode === '123456'); // @TODO : 백엔드와 연결하여 전송받은 isCode와 맞추기
      setIsCode('');
      setErrorMessage('');
    } else {
      setErrorMessage('인증번호가 일치하지 않습니다.')
    }
  };

  // 숫자만 입력 허용하고 최대 6자리
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    if (newCode === '' || (/^\d+$/.test(newCode) && newCode.length <= 6)) {
      setIsCode(newCode);
      setErrorMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal width="w-1/3" onClose={onClose} title='휴대폰 인증' hasIcon={false}>
      <div className="p-4 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-4">본인 확인을 위해 휴대폰으로 전송된 인증번호를 입력해주세요.</p>
        <input
          type="text"
          className="w-[90%] p-2 border-2 border-gray-100 rounded text-center outline-none"
          placeholder="인증번호 입력"
          value={isCode}
          onChange={handleCodeChange}
          maxLength={6}
        />
        {errorMessage && (
          <p className="text-red-400 text-center mt-2">{errorMessage}</p>
        )}
        <div className="w-full pt-10 flex space-x-4 justify-center">
          <Button
            text="재전송"
            width='w-[40%]'
            backgroundColor='bg-gray-400'
            onClick={() => { /* @TODO : 재전송 로직 추가 */ }} />
          <Button
            text="인증 확인"
            width='w-[40%]'
            onClick={handleVerifyClick} />
        </div>
      </div>
    </Modal>
  );
};

export default Certification;