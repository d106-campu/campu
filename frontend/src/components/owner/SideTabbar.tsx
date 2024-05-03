import { RootState } from "@/app/store";
import { setSelectedCampground } from "@/features/owner/OwnerSideSlice";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/@common/Modal/Modal";

interface ISideTabbarProps {
  campgrounds: string[];
}

const SideTabbar: React.FC<ISideTabbarProps> = ({ campgrounds }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [defaultCampground, setDefaultCampground] = useState<string>(
    campgrounds[0]
  );

  const selectCampground = useSelector(
    (state: RootState) => state.ownerSide.selectedCampground
  );

  console.log(setDefaultCampground);
  useEffect(() => {
    dispatch(setSelectedCampground(defaultCampground));
  }, []);

  const handleSelect = (campground: string) => {
    dispatch(setSelectedCampground(campground));
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed left-12 top-1/3 transform -translate-y-1/3">
        <div className="flex flex-col">
          {campgrounds.map((campground, index) => (
            <button
              key={index}
              onClick={() => handleSelect(campground)}
              className={`${
                selectCampground === campground
                  ? "bg-MAIN_GREEN text-white border border-MAIN_GREEN"
                  : "text-gray-400 border border-gray-400"
              }  text-sm py-2 px-4 rounded-lg mb-2`}
            >
              {campground}
            </button>
          ))}
        </div>
      </div>
      {/* 우하단 캠핑장 추가버튼  */}
      <div className="fixed right-16 bottom-10 transform -translate-y-1/3">
        <button
          className="border border-MAIN_GREEN bg-white rounded-full p-4 text-MAIN_GREEN"
          onMouseEnter={() => setIsHover(true)} // 호버 시작 시
          onMouseLeave={() => setIsHover(false)} // 호버 종료 시
          onClick={toggleModal}
        >
          <GoPlus />
        </button>
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
      {isHover && (
        <div className="fixed text-sm right-20 bottom-28 p-4 border border-gray-300 rounded-md">
          🤗 추가로 등록할 캠핑장이 있으신가요?
        </div>
      )}
    </>
  );
};

export default SideTabbar;
