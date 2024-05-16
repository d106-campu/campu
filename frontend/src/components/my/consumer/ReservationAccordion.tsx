import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import ReservationSection from "@/components/@common/Reservation/ReservationSection";
import Button from "@/components/@common/Button/Button";
import { IMyReservationAllRes } from "@/types/my";

interface IReservationAccordionProps {
  reservation: IMyReservationAllRes;
  expanded: boolean;
  toggleDetails: (index: number) => void;
  index: number;
  openMapModal: (
    lat: number,
    lng: number,
    facltNm: string,
    addr1: string,
    level: number
  ) => void;
}

const ReservationAccordion = ({
  reservation,
  expanded,
  toggleDetails,
  index,
  openMapModal,
}: IReservationAccordionProps): JSX.Element => {
  const navigate = useNavigate();
  const dataToSend = {
    campsiteId: reservation.campsite.campsiteId,
    reservationId: reservation.reservation.reservationId,
    startDate: reservation.reservation.startDate,
    endDate: reservation.reservation.endDate,
  };

  // 입실일과 퇴실일로부터 숙박일 계산
  const calculateNights = () => {
    const startDate = new Date(reservation.reservation.startDate);
    const endDate = new Date(reservation.reservation.endDate);
    return Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
  };
  const nights = calculateNights();

  return (
    <div
      className={`bg-MAIN_GREEN text-white mb-10 rounded-2xl ${
        expanded ? "" : " shadow-xl"
      }`}
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-1">
        <div className="flex justify-center items-center py-1">
          {/* 캠핑장 이름, 구역 */}
          <h1 className="text-lg font-bold">
            {reservation.campsite.campsiteName}
          </h1>
          {!expanded && (
            <span className="pl-2 text-sm">
              &nbsp;{reservation.campsite.address}
            </span>
          )}
        </div>
        <div className="flex py-2 items-center">
          {/* 날짜 + 더보기 */}
          {!expanded && (
            <span className="text-sm">
              {reservation.reservation.startDate} ~{" "}
              {reservation.reservation.endDate} · {nights}박
            </span>
          )}
          <button className="flex pl-5" onClick={() => toggleDetails(index)}>
            {expanded ? (
              <IoIosArrowUp size="20" />
            ) : (
              <IoIosArrowDown size="20" />
            )}
            {expanded ? (
              <span></span>
            ) : (
              <span className="pl-1 text-sm outline-none">더보기</span>
            )}
          </button>
        </div>
      </div>

      <div className="text-sm bg-white text-black pt-1 pb-3 rounded-b-xl ">
        {expanded && (
          <div className="">
            <div className="w-full flex justify-center rounded-2xl  shadow-md">
              {/* 좌측 주소 + 사진 */}
              <div className="w-[45%] pb-4 p-2">
                <h3 className="flex items-center gap-1 text-gray-400">
                  <FiMapPin />
                  캠핑장 위치
                </h3>
                <p className="pb-[12px] font-bold text-BLACK">
                  {reservation.campsite.address}
                </p>
                <img
                  src={reservation.campsite.thumbnailImageUrl}
                  alt="캠핑장 사진"
                  className="w-full h-52 object-cover object-center rounded-xl"
                />
              </div>
              {/* 구분선 */}
              <div className="w-[2.5%] border-r-[1px] mr-6" />

              {/* 우측 섹션 세부내용 */}
              <div className="w-[45%] h-auto p-4 pt-10">
                <ReservationSection
                  titleLeft="입실 날짜"
                  contentLeft={reservation.reservation.startDate}
                  titleRight="퇴실 날짜"
                  contentRight={reservation.reservation.endDate}
                />
                <ReservationSection
                  titleLeft="가격"
                  contentLeft={reservation.reservation.price.toString()}
                  titleRight="인원"
                  contentRight={`${reservation.reservation.headCnt.toString()}명`}
                />
                <ReservationSection
                  titleLeft="사이트"
                  contentLeft={
                    reservation.room.roomName || "등록된 위치가 없습니다."
                  }
                  titleRight=""
                  contentRight=""
                />
                <ReservationSection
                  titleLeft="기타정보"
                  contentLeft={reservation.room.supplyList || "..."}
                  titleRight=""
                  contentRight=""
                />
              </div>
            </div>

            {/* "지도 보기"와 "리뷰 작성하기" 버튼 추가 */}
            <div className="w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed">
              <Button
                width="w-[300px]"
                text="지도 보기"
                textColor="text-[#3A2929]"
                fontWeight="none"
                backgroundColor="bg-[#E3F0E5]"
                hoverTextColor="text-MAIN_GREEN"
                hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
                onClick={() =>
                  openMapModal(
                    reservation.campsiteLocation.mapY,
                    reservation.campsiteLocation.mapX,
                    reservation.campsite.campsiteName,
                    reservation.campsite.address,
                    5
                  )
                }
              />
              {reservation.reservation.status === "review" && (
                <Button
                  width="w-[300px]"
                  text="리뷰 작성하기"
                  textColor="text-[#3A2929]"
                  fontWeight="none"
                  backgroundColor="bg-SUB_YELLOW"
                  hoverTextColor="text-MAIN_GREEN"
                  hoverBackgroundColor="hover:bg-HOVER_YELLOW"
                  onClick={() =>
                    navigate(`/camps/review-write`, { state: dataToSend })
                  }
                />
              )}
              {reservation.reservation.status === "cancle" && (
                <Button
                  width="w-[300px]"
                  text="예약 취소하기"
                  textColor="text-[#3A2929]"
                  fontWeight="none"
                  backgroundColor="bg-SUB_PINK"
                  hoverTextColor="text-MAIN_GREEN"
                  hoverBackgroundColor="hover:bg-HOVER_PINK"
                  // @TODO : 예약취소 API 연결 필요 (삭제)
                />
              )}
              {reservation.reservation.status === "reservation" && (
                <Button
                  width="w-[300px]"
                  text="다시 예약하기"
                  textColor="text-[#3A2929]"
                  fontWeight="none"
                  backgroundColor="bg-blue-200"
                  hoverTextColor="text-MAIN_GREEN"
                  hoverBackgroundColor="hover:bg-blue-300"
                  onClick={() =>
                    navigate(`/camps/${reservation.campsite.campsiteId}`)
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ReservationAccordion;
