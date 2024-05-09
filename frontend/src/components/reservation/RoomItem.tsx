import Button from "@/components/@common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setReservationData } from "@/features/reservation/ReservationSlice";
import { scrollToTop } from "@/utils/scrollToTop";
import { IRoomItem } from "@/types/reservation";

interface IRoomItemProps extends IRoomItem {
  // campsiteId: number;
}

const RoomItem = ({ room }: { room: IRoomItemProps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @TODO: 캠프장 정보는 리액트 쿼리로 가져오기
  const campsite = {
    campsiteId: 1,
    facltNm: "캠프유캠푸 캠핑장", // 캠핑장 이름
    tel: "010-1234-5678", // 캠핑장 전화번호
    addr1: "경상북도 칠곡군 가산면 금화리 산 49-1", // 캠핑장 주소
    addr2: "캠프유캠푸 캠핑장", // 캠핑장 상세 주소
    checkIn: "14:00", // 캠핑장 입실 시간
    checkOut: "11:00", // 캠핑장 퇴실 시간
    mapX: 36.1334375, // 위도
    mapY: 128.3710625, //경도
    rating: 3, // 별점
  };

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );
  const { headCount } = useSelector((state: RootState) => state.headCount);

  const makeReservation = () => {
    // 예약 정보 업데이트
    const newReservationData = {
      id: room.id,
      image: room.image_url,
      campsite_faclt_nm: campsite.facltNm, // 캠핑장 이름
      campsite_tel: campsite.tel, // 캠핑장 전화번호
      campsite_addr1: campsite.addr1, // 캠핑장 주소
      campsite_addr2: campsite.addr2, // 캠핑장 상세 주소
      mapX: campsite.mapX, // 위도
      mapY: campsite.mapY, // 경도
      rating: campsite.rating, // 별점
      roomName: room.name, // 캠핑장 방 이름
      roomInduty: room.induty, // 캠핑 유형
      supplyList: room.supplyList,
      headCnt: headCount, // 예약 인원
      price: room.price, // 총 가격
      startDate: startDate, // 캠핑 시작일
      endDate: endDate, // 캠핑 종료일
      checkIn: campsite.checkIn, // 캠핑장 입실 시간
      checkOut: campsite.checkOut, // 캠핑장 퇴실 시간
    };

    dispatch(setReservationData(newReservationData));
    navigate(`/camps/${campsite.campsiteId}/payment`);
    scrollToTop();
  };

  return (
    <div
      className={`w-full flex items-center border-b py-7 ${
        room.available ? "text-BLACK" : "text-UNIMPORTANT_TEXT_02"
      }`}
    >
      <div key={room.id} className="w-[50%] relative">
        <img
          src={room.image_url}
          alt={room.name}
          className={`w-full h-40 rounded-lg h-30 object-cover object-center ${
            room.available ? "" : "opacity-30"
          }`}
        />
        {!room.available && (
          <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-2xl bg-black bg-opacity-30 rounded-lg">
            예약 마감
          </span>
        )}
      </div>
      <div className="flex justify-between h-40 w-full pl-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold pb-3">{room.name}</h1>
          <div
            className={`flex justify-between ${
              room.supplyList && room.supplyList.length >= 5
                ? "gap-10"
                : "gap-14"
            } text-sm`}
          >
            <div>
              <p className="pb-[10px]">{room.induty}</p>
              <p className="pb-[10px]">
                기준 {room.baseNo}인 (최대 {room.maxNo}인)
              </p>
              <p className="pb-[10px]">
                인원 추가 가격 : {room.extraPrice.toLocaleString("ko-KR")}원
              </p>
              <p className="pb-[10px]">화장실 개수: {room.toiletCnt}</p>
            </div>
            {room.supplyList && room.supplyList.length > 0 && (
              <>
                <div className="border-r" />
                <div>
                  {room.supplyList.slice(0, 4).map((item, index) => (
                    <p key={index} className="pb-[10px]">
                      {item}
                    </p>
                  ))}
                </div>
                {room.supplyList.length >= 5 && (
                  <>
                    <div className="border-r" />
                    <div>
                      {room.supplyList.slice(4).map((item, index) => (
                        <p key={index} className="pb-[10px]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>
            <p
              className={`text-xl font-extrabold ${
                room.available ? "text-MAIN_RED" : "text-SUB_RED"
              }`}
            >
              {room.price.toLocaleString("ko-KR")}원
            </p>
            {!room.available && (
              <p className="text-end font-extrabold text-[#707070]">
                예약 마감
              </p>
            )}
          </div>
          {room.available ? (
            <Button width="w-40" text="예약하기" onClick={makeReservation} />
          ) : (
            <Button
              width="w-40"
              text="빈자리 알림 받기"
              textColor="text-MAIN_GREEN"
              backgroundColor="bg-SUB_GREEN_02"
              hoverBackgroundColor="hover:bg-[#d0e2d3]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default RoomItem;
