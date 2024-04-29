import Calendar from "@/assets/images/CalendarDummy.png";
import ReservationItem from "@/components/owner/ReservationItem";

const OwnerReservation = ({
  selectCampground,
}: {
  selectCampground: string | null;
}) => {
  return (
    <>
      <div>
        <p>{selectCampground}의 앰핑 예약 내역</p>
        {/* @TODO: 달력 컴포넌트 추가해야함 */}
        <div className="py-10">
          {/* 달력 */}
          <div className="flex justify-center">
            <img className="w-[50%]" src={Calendar} />
          </div>

          {/* 예약 리스트 목록 */}
          <div className="flex justify-center py-4">
            <div className="w-[70%] text-end">
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
