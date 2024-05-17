import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReservationItem from "@/components/payment/ReservationItem";
import { updateStatus } from "@/features/reservation/ReservationSlice";
import { RootState } from "@/app/store";

const PaymentContainer = () => {
  const status = useSelector((state: RootState) => state.reservation.status);
  const dispatch = useDispatch();

  // 예약 정보 초기화
  useEffect(() => {
    if (status === "complete") {
      return () => {
        dispatch(updateStatus("proceeding"));
      };
    }
  }, [status, dispatch]);

  return (
    <div className="w-[60%] mx-auto pt-5 pb-14">
      <ReservationItem />
    </div>
  );
};
export default PaymentContainer;
