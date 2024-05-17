import Button from "@/components/@common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setReservationData } from "@/features/reservation/ReservationSlice";
import { scrollToTop } from "@/utils/scrollToTop";
import { IRoomItem } from "@/types/reservation";
import Lottie from "react-lottie";
import { tentOptions } from "@/assets/lotties/lottieOptions";
import { useReservation } from "@/hooks/reservation/useReservation";
import axios from "axios";
import Toast from "../@common/Toast/Toast";
import { useState } from "react";

const RoomItem = ({ room }: { room: IRoomItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAlertActive, setIsAlertActive] = useState(!room.emptyNotification); // 빈자리 알림 상태관리

  // Redux 상태 불러오기
  const campsite = useSelector((state: RootState) => state.campsite.data);
  const { headCount } = useSelector((state: RootState) => state.headCount);
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  const { usePostAlert, useDeleteAlert } = useReservation();
  const { mutate: postAlert } = usePostAlert({
    roomId: room.id,
    startDate,
    endDate,
  });
  const { mutate: deleteRoomAlert } = useDeleteAlert();

  // 빈자리 알림 등록 핸들러
  const handlePostAlert = () => {
    // 빈자리 알림 등록 API 호출
    postAlert(
      { roomId: room.id, startDate, endDate },
      {
        onSuccess: () => {
          setIsAlertActive(!isAlertActive);
          Toast.info("빈자리 알림이 등록되었습니다 😊");
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            const res = err.response;

            if (res && res.status === 429) {
              if (res.data.code === "EMPTY_NOTIFICATION501") {
                Toast.error(
                  "빈자리 알림 등록 횟수를 초과하였습니다 😥 최대 5개까지 등록 가능합니다."
                );
                return;
              }
            }

            if (res && res.status === 409) {
              Toast.error("이미 등록한 빈자리 알림입니다 😥");
              return;
            }
          }
          Toast.error("빈자리 알림 등록에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 빈자리 알림 취소 핸들러
  const handleDeleteAlert = (roomId: number) => {
    deleteRoomAlert(roomId, {
      onSuccess: () => {
        setIsAlertActive(!isAlertActive);
        Toast.info("빈자리 알림이 취소되었습니다 😊");
      },
      onError: () => {
        Toast.error("빈자리 알림 취소에 실패했습니다. 다시 시도해주세요.");
        return;
      },
    });
  };

  const makeReservation = () => {
    // 예약 정보 업데이트
    const newReservationData = {
      roomId: room.id,
      id: room.id,
      image: room.imageUrl,
      roomName: room.name, // 캠핑장 방 이름
      roomInduty: room.induty, // 캠핑 유형
      totalPrice: room.totalPrice, // 총 가격
      supplyList: room.supplyList,
      facltNm: campsite.facltNm, // 캠핑장 이름
      tel: campsite.tel, // 캠핑장 전화번호
      addr1: campsite.addr1, // 캠핑장 주소
      addr2: campsite.addr2, // 캠핑장 상세 주소
      mapX: campsite.mapX, // 위도
      mapY: campsite.mapY, // 경도
      checkIn: campsite.checkIn, // 캠핑장 입실 시간
      checkOut: campsite.checkOut, // 캠핑장 퇴실 시간
      score: campsite.score, // 별점
      headCnt: headCount, // 예약 인원
      startDate: startDate, // 캠핑 시작일
      endDate: endDate, // 캠핑 종료일
    };

    dispatch(setReservationData(newReservationData));
    navigate(`/camps/${campsite.id}/payment`);
    scrollToTop();
  };

  return (
    <div
      className={`w-full flex items-center border-b py-7 ${
        room.available ? "text-BLACK" : "text-UNIMPORTANT_TEXT_02"
      }`}
    >
      {/* 캠핑존 사진 */}
      <div key={room.id} className="w-[50%] relative">
        {room.imageUrl ? (
          <img
            src={room.imageUrl}
            alt={room.name}
            className={`w-full h-40 rounded-lg h-30 object-cover object-center ${
              room.available ? "" : "opacity-30"
            }`}
          />
        ) : (
          <>
            {/* 등록된 캠핑존 사진이 없을 때 UI */}
            <div
              className={`flex flex-col justify-center w-full h-40 rounded-lg h-30 object-cover object-center ${
                room.available ? "" : "opacity-30"
              }`}
            >
              <Lottie
                options={tentOptions}
                height={200}
                width={270}
                speed={0.5}
              />
              <p className="text-UNIMPORTANT_TEXT_02 text-center mr-3">
                등록된 캠핑존 사진이 없어요
              </p>
            </div>
          </>
        )}
        {/* 예약이 불가능할 경우 추가 UI */}
        {!room.available && (
          <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-2xl bg-black bg-opacity-30 rounded-lg">
            예약 마감
          </span>
        )}
      </div>
      <div className="flex justify-between h-40 w-full pl-7">
        {/* 캠핑존 정보 */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold pb-3">{room.name}</h1>
          <div
            className={`flex justify-between ${
              room.supplyList && room.supplyList.length >= 5
                ? "gap-10"
                : "gap-14"
            } text-sm`}
          >
            {/* 기본 정보 */}
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

            {/* 추가 정보 (부대 시설 목록) */}
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
          {/* 가격 및 예약 마감 텍스트*/}
          <div>
            <p
              className={`text-xl font-extrabold ${
                room.available ? "text-MAIN_RED" : "text-SUB_RED"
              }`}
            >
              {room.totalPrice.toLocaleString("ko-KR")}원
            </p>
            {!room.available && (
              <p className="text-end font-extrabold text-[#707070]">
                예약 마감
              </p>
            )}
          </div>

          {/* 버튼 - 예약 가능시 : 예약하기 / 예약 불가능시 : 알림 받기 및 취소하기  */}
          {room.available ? (
            <Button width="w-40" text="예약하기" onClick={makeReservation} />
          ) : !isAlertActive ? (
            <Button
              onClick={() => handleDeleteAlert(room.id)}
              width="w-40"
              text="빈자리 알림 취소"
              textColor="text-[#ffffff]"
              backgroundColor="bg-SUB_RED"
              hoverBackgroundColor="hover:bg-HOVER_PINK"
            />
          ) : (
            <Button
              onClick={handlePostAlert}
              width="w-40"
              text="빈자리 알림 받기"
              textColor="text-MAIN_GREEN"
              backgroundColor="bg-SUB_GREEN_02"
              hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default RoomItem;
