import OwnerCalendar from "@/components/@common/Calendar/OwnerCalendar";
import ReservationItem from "@/components/owner/ownerReservation/ReservationItem";
import { useState } from "react";
import { dateToDateString } from "@/utils/formatDateTime";
import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useOwner } from "@/hooks/owner/useOwner";

const selectCampsiteInfo = createSelector(
  (state: RootState) => state.ownerSide,
  (ownerSide) => ({
    campsiteName: ownerSide.campsiteName,
    campsiteId: ownerSide.campsiteId,
  })
);

const OwnerReservation = () => {
  // 달력에서 선택된 날짜 (Date 객체)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { campsiteId, campsiteName } = useSelector(selectCampsiteInfo);
  const dateString = dateToDateString(selectedDate); // 백으로 보낼 때는 YYYY-MM-DD 형식의 문자열로 보내야 함
  const { useGetReservationList } = useOwner();
  const { data: reservationList } = useGetReservationList({
    campsiteId: campsiteId!,
    date: dateString!,
  });

  return (
    <>
      <div className="py-5">
        <p className="p-4 font-semibold">
          <span className="text-MAIN_GREEN">{campsiteName!}</span> 의 예약 내역
        </p>
        <div>
          {/* 달력 */}
          <div className="flex justify-center w-full border rounded-md pt-4 pb-8">
            <div className="w-[80%]">
              <OwnerCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
          </div>
          {/* 예약 리스트 목록 */}
          <div className="flex justify-center py-4">
            <div className="w-[80%] text-end">
              <p>
                <span className="text-MAIN_GREEN font-semibold">
                  {reservationList?.data.reservationList.length}
                </span>
                개의 예약 내역이 있습니다.
              </p>
              <div>
                {reservationList?.data.reservationList.map(
                  (reservation, index) => (
                    <ReservationItem key={index} reservation={reservation} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerReservation;
