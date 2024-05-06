import { useState, useEffect } from 'react';
import Modal from "@/components/@common/Modal/Modal";
import { FaCheck } from "react-icons/fa";

interface IChangePasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordSuccessModal = ({
  isOpen, onClose
}: IChangePasswordSuccessModalProps): JSX.Element => {
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
    return () => clearTimeout(timeout); // 컴포넌트가 언마운트되면 타임아웃 제거
  }, [modalOpen, onClose]);

  return (
    <Modal
      width="w-[500px]"
      onClose={() => {
        setModalOpen(false); // 모달 닫기
        onClose(); // 부모 컴포넌트의 onClose 호출
      }}
      title="비밀번호 변경 완료"
    >
      <div className="p-5 flex flex-col items-center justify-center">
        <div className='py-5'>
          <FaCheck className='text-MAIN_GREEN' size={50}/>
        </div>
        <p className="text-center pb-1">비밀번호 변경이 완료되었습니다 !</p>
        <p className='text-xs text-GRAY text-center'>이 안내는 자동으로 닫힙니다.</p>
      </div>
    </Modal>
  );
};

export default ChangePasswordSuccessModal;
