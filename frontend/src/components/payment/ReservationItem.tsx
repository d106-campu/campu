import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";
import Button from "@/components/@common/Button/Button";
import MapModal from "@/components/@common/Map/MapModal";
import Kakao_logo from "@/assets/images/kakao_logo.png";
import stamp from "@/assets/images/stamp.png";
import { FiMapPin } from "react-icons/fi";
import { FaRegFaceSmile, FaRegFaceSmileWink } from "react-icons/fa6";
import { useState } from "react";
import Lottie from "react-lottie";
import { tentOptions } from "@/assets/lotties/lottieOptions";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import usePayment from "@/hooks/payment/usePayment";
import { IPaymentPrepareReq } from "@/types/payment";
import CancelPaymentModal from "./CancelPaymentModal";
import { useUser } from "@/hooks/user/useUser";

const ReservationItem = () => {
  const { userProfileQuery } = useUser();
  const profileData = userProfileQuery.data?.data.myProfile;
  const nickname = profileData?.nickname || "";

  // Redux 상태 불러오기
  const {
    image,
    facltNm,
    tel,
    addr1,
    addr2,
    mapX,
    mapY,
    score,
    roomId,
    roomName,
    roomInduty,
    supplyList,
    headCnt,
    totalPrice,
    startDate,
    endDate,
    checkIn,
    checkOut,
  } = useSelector((state: RootState) => state.reservation.data);
  const status = useSelector((state: RootState) => state.reservation.status);
  const impUid = useSelector(
    (state: RootState) => state.reservation.data.impUid
  );
  const reservationId = useSelector(
    (state: RootState) => state.reservation.data.reservationId
  );
  // const nickname = useSelector((state: RootState) => state.auth.nickname);

  const { preparePaymentMutation } = usePayment();

  const proceedingMessage = `${nickname}님, 예약 정보를 확인 후 결제를 진행해주세요`;
  const completeMessage = `${nickname}님, 예약이 정상적으로 완료되었습니다! 즐거운 캠핑되세요`;

  const [mapModal, setMapModal] = useState<boolean>(false); // 지도 모달 상태관리
  const toggleMapModal = () => setMapModal(!mapModal);

  // 결제 취소하기
  const [cancelPaymentModal, setCancelPaymentModal] = useState<boolean>(false); // 결제 취소 모달 상태관리
  const toggleCancelPaymentModal = () =>
    setCancelPaymentModal(!cancelPaymentModal);

  const handlePayment = () => {
    // 결제 요청
    const data: IPaymentPrepareReq = {
      roomId: roomId,
      headCnt: headCnt,
      price: totalPrice,
      startDate: startDate,
      endDate: endDate,
    };
    // console.log(data);
    preparePaymentMutation.mutate(data);
  };

  return (
    <div className="relative">
      <div className="pl-3 pb-2">
        <h1 className="text-2xl font-bold">
          {status === "proceeding" ? "예약 정보 확인" : "예약 완료"}
        </h1>
        <p className="flex items-center gap-1 text-MAIN_GREEN text-sm">
          {status === "proceeding" ? proceedingMessage : completeMessage}
          <span>
            {status === "proceeding" ? (
              <FaRegFaceSmile />
            ) : (
              <FaRegFaceSmileWink />
            )}
          </span>
        </p>
      </div>
      {/* 헤더 */}
      <div className="h-14 bg-MAIN_GREEN text-white rounded-tl-2xl rounded-tr-2xl">
        <div className="flex justify-between items-center px-5 pt-1">
          <div className="flex justify-center items-center py-2">
            {/* 캠핑장 이름 */}
            <h2 className="text-2xl font-bold pl-3">{facltNm}</h2>
          </div>
        </div>
      </div>

      {/* 내용 */}
      <div className="flex justify-center w-full text-sm bg-white text-BLACK p-3 rounded-br-2xl rounded-bl-2xl shadow-lg">
        <div className="w-[50%] p-4 pl-6">
          <h3 className="flex items-center gap-1 text-gray-400">
            <FiMapPin />
            캠핑장 위치
          </h3>
          <p className="pb-[12px] font-bold text-BLACK">
            {addr1} {addr2}
          </p>
          {image ? (
            <img
              src={image}
              alt={`${facltNm} ${roomName}`}
              className="w-full h-52 object-cover object-center rounded-xl"
            />
          ) : (
            <>
              <Lottie
                options={tentOptions}
                height={200}
                width={270}
                speed={0.5}
              />
              <p className="text-center text-UNIMPORTANT_TEXT_02">
                등록된 캠핑 사이트 사진이 없어요
              </p>
            </>
          )}
        </div>

        {/* 구분선 */}
        <div className="w-[2.5%] border-r-[1px] mr-6" />

        {/* 예약 세부 사항 */}
        <div className="w-[50%] p-4 h-auto text-gray-400">
          <h3>날짜</h3>
          <p className="pb-[15px] font-bold text-BLACK">
            {`${formatDate(startDate)} ~ ${formatSimpleDate(
              endDate
            )} · ${diffDays(startDate, endDate)}박 `}
          </p>
          <div className="flex gap-24">
            <div>
              <h3>인원</h3>
              <p className="pb-[15px] font-bold text-BLACK">인원 {headCnt}</p>
              <h3>사이트</h3>
              <p className="pb-[15px] font-bold text-BLACK">{roomName}</p>
              <h3>가격</h3>
              <p className="pb-[15px] font-bold text-MAIN_RED">
                {totalPrice.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div>
              <h3>캠핑장 유형</h3>
              <p className="pb-[15px] font-bold text-BLACK">{roomInduty}</p>
              {checkIn && checkOut && (
                <>
                  <h3>입실·퇴실 시간</h3>
                  <p className="pb-[15px] font-bold text-BLACK">
                    {checkIn} - {checkOut}
                  </p>
                </>
              )}
              <h3>전화번호</h3>
              <p className="pb-[15px] font-bold text-BLACK">
                {formatPhoneNumber(tel)}
              </p>
            </div>
          </div>
          {supplyList && supplyList.length > 0 && (
            <div className="pb-[15px]">
              <h3>기타 정보</h3>
              {supplyList.map((item: string, index: number) => (
                <span key={index} className="font-bold text-BLACK">
                  {item}
                  {index < supplyList.length - 1 && (
                    <span className="text-BLACK">&nbsp;·&nbsp;</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 버튼 + 절취선 */}
      <div className="w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed">
        <Button
          onClick={toggleMapModal}
          width="w-[40%]"
          text="지도 보기"
          textColor="text-[#3A2929]"
          fontWeight="none"
          backgroundColor="bg-[#E3F0E5]"
          hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
        />
        {mapModal && (
          <MapModal
            lat={mapY}
            lng={mapX}
            facltNm={facltNm}
            addr1={addr1}
            rate={score}
            level={5}
            toggleModal={toggleMapModal}
          />
        )}
        {status === "proceeding" ? (
          <Button
            width="w-[40%]"
            text=""
            textColor="text-[#3A2929]"
            fontWeight="none"
            backgroundColor="bg-SUB_YELLOW"
            hoverBackgroundColor="hover:bg-HOVER_YELLOW"
            children={
              <div className="flex justify-center items-center gap-1">
                <img src={Kakao_logo} className="h-6" alt="카카오페이" />
                <p>결제하기</p>
              </div>
            }
            onClick={handlePayment}
          />
        ) : (
          <Button
            width="w-[40%]"
            text="결제 취소하기"
            textColor="text-[#3A2929]"
            fontWeight="none"
            backgroundColor="bg-SUB_PINK"
            hoverBackgroundColor="hover:bg-HOVER_PINK"
            onClick={toggleCancelPaymentModal}
          />
        )}
        {cancelPaymentModal && (
          <CancelPaymentModal
            toggleModal={toggleCancelPaymentModal}
            reservationId={reservationId}
            impUid={impUid}
          />
        )}
      </div>
      {status === "complete" && (
        <img
          src={stamp}
          alt="예약 완료 도장"
          className="w-80 absolute bottom-[-5%] left-[78%]"
        />
      )}
    </div>
  );
};
export default ReservationItem;
