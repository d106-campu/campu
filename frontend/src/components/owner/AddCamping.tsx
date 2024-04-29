import { useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import TentImage from "@/assets/images/profile.png";

const AddCamping = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="w-[70%]">
          <p className="font-bold text-xl pb-10">캠핑장 추가하기</p>
          {/* 캠핑장 추가 안내 */}
          <div>
            {/* 문구 */}
            <div className="border rounded-md text-center py-28">
              <div className="flex justify-center pb-4">
                <img src={TentImage} className="w-12 rounded-full" />
              </div>
              <p className="pb-2">캠핑장 첫 등록입니다 !</p>
              <p className="pb-4">
                사업자번호를 입력하고 나의 캠핑장을 등록해주세요
              </p>
              <button
                onClick={toggleModal}
                className="border border-MAIN_GREEN px-4 py-2 rounded-md text-MAIN_GREEN"
              >
                바로 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal width="w-96" onClose={toggleModal}>
          <div className="text-center pb-4">
            <p className="text-sm">반갑습니다 사장님 😊</p>
            <p className="py-4">캠핑장 사업자번호 입력하기</p>
            <input
              className="border rounded-md p-3 text-xs"
              placeholder="사업자번호 7자리를 입력해주세요."
            />
            <button className="bg-MAIN_GREEN text-white p-3 rounded-md text-xs ml-1">
              등록
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddCamping;
