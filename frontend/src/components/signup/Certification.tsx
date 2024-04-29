import { useState } from 'react';
import Button from '@/components/@common/Button/Button';

interface CertificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: boolean) => void;
}

const Certification = ({ isOpen, onVerify, }: CertificationProps) => {
  const [isCode, setIsCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleVerifyClick = () => {
    if (isCode.length === 6) {
      onVerify(isCode === '123456');
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
    <div className="p-4">
      <div className='flex flex-col items-center justify-center'>
        <h1 className="text-xl font-bold pb-2">휴대폰 인증</h1>
        <h1 className='text-gray-400 py-2'>본인 인증을 위해 휴대폰으로 전송된 인증번호를 입력해주세요</h1>
      </div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded text-center outline-none"
        placeholder="인증번호 입력"
        value={isCode}
        onChange={handleCodeChange}
        maxLength={6}
      />
      {errorMessage && (
        <div className="text-red-400 text-center py-2">{errorMessage}</div>
      )}
      <div className='flex justify-evenly pt-5'>
        <Button
          text='재전송'
          backgroundColor='bg-gray-400'
          width='w-28'
          padding='py-2 px-4'
        />
        <Button
          text="인증 확인"
          width='w-28'
          padding='py-2 px-4'
          onClick={handleVerifyClick}
        />
      </div>
    </div>
  );
};

export default Certification;