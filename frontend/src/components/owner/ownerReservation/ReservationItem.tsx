import { IReservationSimpleRes } from "@/types/owner";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

const ReservationItem = ({
  reservation,
}: {
  reservation: IReservationSimpleRes;
}) => {
  return (
    <>
      <div className=" flex flex-col border-b border-gray-300 p-4">
        <h2 className="pb-2 text-lg font-semibold text-start">
          {reservation.room.name}
        </h2>

        <div className="flex justify-evenly items-center">
          <div>
            <img
              src={reservation.room.imageUrl!}
              className="flex rounded-md h-28"
            />
          </div>
          <div>
            <div className="flex py-2">
              <p className="text-gray-500 mr-4">예약자 </p>
              <p>{reservation.customer.nickName}</p>
            </div>
            <div className="flex">
              <p className="text-gray-500 mr-4">연락처 </p>
              <p>{formatPhoneNumber(reservation.customer.tel)}</p>
            </div>
          </div>

          <div>
            <div className="flex py-2">
              <p className="text-gray-500 mr-4">날 짜 </p>
              <p>
                {reservation.startDate} / {reservation.endDate}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 mr-4">인 원 </p>
              <p>{reservation.headCnt} 명</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationItem;
