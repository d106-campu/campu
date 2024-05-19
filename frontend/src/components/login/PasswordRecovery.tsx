import { useState, useEffect } from 'react';
import Modal from "@/components/@common/Modal/Modal";

interface IPasswordRecoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordRecovery = ({
  isOpen, onClose
}: IPasswordRecoveryProps): JSX.Element => {
  // 모달이 열린 상태를 관리하기 위한 상태
  const [modalOpen, setModalOpen] = useState(isOpen);

  // 모달이 열린 후 1.5초 후에 자동으로 닫히도록 설정
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (modalOpen) {
      timeout = setTimeout(() => {
        onClose(); 
      }, 1500); // 1.5초 후에 자동으로 닫힘
    }
    return () => clearTimeout(timeout);
  }, [modalOpen, onClose]);

  return (
    <Modal
      width="w-[500px]"
      onClose={() => {
        setModalOpen(false);
        onClose();
      }}
      title="비밀번호 찾기"
    >
      <div className="p-5 flex flex-col items-center justify-center">
        <p className="text-center pb-1">비밀번호 찾기는 준비 중입니다.</p>
        <p className="text-center pb-1">관리자에게 문의해주세요. 😂</p>
        <p className='text-xs text-GRAY text-center'>이 안내는 자동으로 닫힙니다.</p>
      </div>
    </Modal>
  );
};

export default PasswordRecovery;
