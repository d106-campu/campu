import { useState, useEffect } from 'react';
import Modal from "@/components/@common/Modal/Modal";
import { FaCheck } from "react-icons/fa";

interface ICertificationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationSuccessModal = ({
  isOpen, onClose
}: ICertificationSuccessModalProps): JSX.Element => {
  
  const [modalOpen, setModalOpen] = useState(isOpen); // 모달이 열린 상태를 관리하기 위한 상태

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  // 모달이 열린 후 1.5초 후에 자동으로 닫히도록 설정
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (modalOpen) {
      timeout = setTimeout(() => {
        onClose(); 
      }, 1500);
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
      title="인증 성공"
    >
      <div className="p-5 flex flex-col items-center justify-center">
        <div className='py-5'>
          <FaCheck className='text-MAIN_GREEN' size={50}/>
        </div>
        <p className="text-center pb-1">인증이 완료되었습니다 !</p>
        <p className='text-xs text-GRAY text-center'>이 안내는 자동으로 닫힙니다.</p>
      </div>
    </Modal>
  );
};

export default CertificationSuccessModal;
