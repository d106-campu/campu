import OwnerTabbar from "./OwnerTabbar";

const OwnerContainer = () => {
  return (
    <>
      <div className="flex justify-center py-10">
        <div className="w-[70%] bg-blue-100">
          <p className="font-bold text-xl">캠핑장 관리</p>
          <OwnerTabbar
            leftTab="나의 캠핑장"
            middleTab="예약 관리"
            rightTab="리뷰"
          />
        </div>
      </div>
    </>
  );
};

export default OwnerContainer;
