import OwnerCalendar from "@/components/@common/Calendar/OwnerCalendar";
import ReservationItem from "@/components/owner/ownerReservation/ReservationItem";
import { useEffect, useState } from "react";
import { dateToDateString } from "@/utils/formatDateTime";
import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useOwner } from "@/hooks/owner/useOwner";

const selectCampsiteInfo = createSelector(
  (state: RootState) => state.ownerSide.campsiteId,
  (campsiteId) => ({ campsiteId })
);

const OwnerReservation = () => {
  // 달력에서 선택된 날짜 (Date 객체)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { campsiteId } = useSelector(selectCampsiteInfo);
  // 확인용 - 아래 코드는 확인하시고 지워주세요
  // 백으로 보낼 때는 YYYY-MM-DD 형식의 문자열로 보내야 함
  const dateString = dateToDateString(selectedDate);
  useEffect(() => {
    console.log(selectedDate); // Fri May 10 2024 00:00:00 GMT+0900 (한국 표준시)
    console.log(dateString); // 2024-05-10
  }, [selectedDate]);

  const { useGetReservationList } = useOwner();
  const { data: reservationList } = useGetReservationList({
    campsiteId: campsiteId!,
    date: dateString!,
  });

  return (
    <>
      <div className="py-5">
        <p className="p-4 font-semibold">
          <span className="text-MAIN_GREEN">{campsiteId}</span> 의 예약 내역
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
