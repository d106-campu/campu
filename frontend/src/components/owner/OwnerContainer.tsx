import { useSelector } from "react-redux";
import OwnerManage from "@/components/owner/ownerManage/OwnerManage";
import OwnerReservation from "@/components/owner/ownerReservation/OwnerReservation";
import OwnerReview from "@/components/owner/ownerReview/OwnerReview";
import OwnerTabbar from "@/components/owner/OwnerTabbar";
import { RootState } from "@/app/store";

const OwnerContainer = () => {
  const tab = useSelector((state: RootState) => state.ownerTab.tab);
  const selectCampground = useSelector(
    (state: RootState) => state.ownerSide.selectedCampground
  );

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="w-[70%]">
          <p className="font-bold text-xl">캠핑장 관리</p>
          <OwnerTabbar
            leftTab="나의 캠핑장"
            middleTab="예약 관리"
            rightTab="리뷰"
          />
          <div className="w-full">
            {tab === "내 캠핑장" ? <OwnerManage selectCampground={selectCampground} /> : null}
            {tab === "예약 관리" ? <OwnerReservation selectCampground={selectCampground} /> : null}
            {tab === "리뷰" ? <OwnerReview selectCampground={selectCampground} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerContainer;
