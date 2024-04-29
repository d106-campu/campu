import { useState } from "react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/@common/Modal/Modal";
import { SlSizeFullscreen } from "react-icons/sl";

interface ICampSiteLayoutProps {
  layout: string;
  campsite_name: string;
}

const CampSiteLayout = ({ layout, campsite_name }: ICampSiteLayoutProps) => {
  // 모달 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="relative group w-[50%]">
        <h3 className="text-xl font-bold pb-2">캠핑존 배치도</h3>
        <img
          src={layout}
          alt={`${campsite_name} 배치도`}
          className="rounded-xl cursor-pointer"
          onClick={() => openModal()}
        />
        {layout && (
          <div className="absolute bottom-2 right-2">
            <Button
              width="w-9"
              height="h-9"
              text=""
              icon={SlSizeFullscreen}
              iconSize={15}
              iconMargin=""
              backgroundColor="bg-[#030303ae]"
              hoverBackgroundColor="hover:bg-[#030303cc]"
              onClick={() => openModal()}
            />
          </div>
        )}
      </div>

      {/* 모달 - 캠핑존 배치도 확대해서 보기 */}
      {isOpen && (
        <Modal width="w-[65%]" onClose={closeModal}>
          <div className="pt-3 ">
            <img
              src={layout}
              alt={`${campsite_name} 배치도`}
              className="rounded-lg object-scale-down"
              onClick={() => openModal()}
            />
            <h3 className="text-center font-bold text-BLACK text-xl pt-3 ">
              {campsite_name} 배치도
            </h3>
          </div>
        </Modal>
      )}
    </>
  );
};
export default CampSiteLayout;
