import OwnerCalendar from "@/components/@common/Calendar/OwnerCalendar";
import ReservationItem from "@/components/owner/ownerReservation/ReservationItem";
import { useEffect, useState } from "react";
import { dateToDateString } from "@/utils/formatDateTime";

const OwnerReservation = ({
  selectCampground,
}: {
  selectCampground: string | null;
}) => {
  // 달력에서 선택된 날짜 (Date 객체)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 확인용 - 아래 코드는 확인하시고 지워주세요
  // 백으로 보낼 때는 YYYY-MM-DD 형식의 문자열로 보내야 함
  const dateString = dateToDateString(selectedDate);
  useEffect(() => {
    console.log(selectedDate);  // Fri May 10 2024 00:00:00 GMT+0900 (한국 표준시)
    console.log(dateString);    // 2024-05-10
  }, [selectedDate]);

  return (
    <>
      <div className="py-5">
        <p className="p-4 font-semibold">
          <span className="text-MAIN_GREEN">{selectCampground}</span> 의 예약
          내역
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
                  {reservations.length}
                </span>
                개의 예약 내역이 있습니다.
              </p>
              <div>
                {reservations.map((reservation, index) => (
                  <ReservationItem key={index} reservation={reservation} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerReservation;

// 더미데이터
const reservations = [
  {
    name: "A구역 (벚꽃 캠핑존)",
    guest: "서준호",
    date: "2024.04.20",
    night: "1박",
    contact: "010-1234-1234",
    guestsCount: 3,
  },
  {
    name: "D구역 (키즈 캠핑존)",
    guest: "최호조",
    date: "2024.04.20",
    night: "1박",
    contact: "010-1234-5678",
    guestsCount: 4,
  },
  {
    name: "G구역 (키즈 캠핑존)",
    guest: "박단비",
    date: "2024.04.20",
    night: "2박",
    contact: "010-0000-5678",
    guestsCount: 2,
  },
];
