import { useSelector } from "react-redux";
import OwnerManage from "@/components/owner/OwnerManage";
import OwnerReservation from "@/components/owner/OwnerReservation";
import OwnerReview from "@/components/owner/OwnerReview";
import OwnerTabbar from "@/components/owner/OwnerTabbar";
import { RootState } from "@/app/store";

const OwnerContainer = () => {
  const tab = useSelector((state: RootState) => state.ownerTab.tab);

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
            {tab === "내 캠핑장" ? <OwnerManage /> : null}
            {tab === "예약 관리" ? <OwnerReservation /> : null}
            {tab === "리뷰" ? <OwnerReview /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerContainer;
