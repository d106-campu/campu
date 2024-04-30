interface IReservation {
  name: string;
  guest: string;
  date: string;
  contact: string;
  night: string;
  guestsCount: number;
}
const ReservationItem = ({ reservation }: { reservation: IReservation }) => {
  return (
    <>
      <div className=" flex flex-col border-b border-gray-300 p-4">
        <h2 className="text-lg font-semibold text-start">{reservation.name}</h2>

        <div className="flex justify-around">
          <div>
            <div className="flex py-2">
              <p className="text-gray-500 mr-4">예약자 </p>
              <p>{reservation.guest}</p>
            </div>
            <div className="flex">
              <p className="text-gray-500 mr-4">연락처 </p>
              <p>{reservation.contact}</p>
            </div>
          </div>

          <div>
            <div className="flex py-2">
              <p className="text-gray-500 mr-4">날 짜 </p>
              <p>
                {reservation.date} / {reservation.night}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 mr-4">인 원 </p>
              <p>{reservation.guestsCount} 명</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationItem;
