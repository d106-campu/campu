import { TiArrowRightThick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const GoOwner = () => {
  const navigate = useNavigate();

  // 페이지 이동시 스크롤 상단으로 고정
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const goToOwnerPage = () => {
    navigate("/owner");
  };
  return (
    <>
      <div className="w-full bg-[#BDDDC2] py-10">
        <div className="text-center">
          <div className="text-xl font-semibold">캠핑장 사장님이신가요 ?</div>
          <div className="text-lg py-2">
            CampU에서 캠핑장 등록하고 쉽게 예약 관리 해보세요😊
          </div>
          {/* @TODO: 추후 navigate 추가해야함 */}
          <div className="flex justify-center">
            <p
              className="cursor-pointer border bg-white font-semibold px-4 py-2 rounded-2xl flex items-center"
              onClick={() => {
                goToOwnerPage();
                scrollToTop(); // 페이지 이동 및 상단으로 스크롤
              }}
            >
              캠핑장 바로 등록하기
              <TiArrowRightThick className="ml-2 text-orange-500" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoOwner;
