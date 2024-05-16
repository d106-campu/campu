import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import Button from "@/components/@common/Button/Button";
import { IMyReservationAllRes } from "@/types/my";
import { useEffect, useRef, useState } from "react";
import CancelPaymentModal from "@/components/payment/CancelPaymentModal";
import Lottie from "react-lottie";
import { tentOptions } from "@/assets/lotties/lottieOptions";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";

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

  // 결제 취소하기
  const [cancelPaymentModal, setCancelPaymentModal] = useState<boolean>(false); // 결제 취소 모달 상태관리
  const toggleCancelPaymentModal = () =>
    setCancelPaymentModal(!cancelPaymentModal);

  // Ref와 상태를 사용한 아코디언 동작 구현
  const [isOpen, setIsOpen] = useState<boolean>(expanded);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(expanded);
  }, [expanded]);

  useEffect(() => {
    if (isOpen) {
      if (wrapperRef.current && contentRef.current) {
        wrapperRef.current.style.height = `${contentRef.current.clientHeight}px`;
      }
    } else {
      if (wrapperRef.current) {
        wrapperRef.current.style.height = "0px";
      }
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    toggleDetails(index); // 클릭 시 토글 상태를 부모 컴포넌트에 알림
  };

  return (
    <div
      onClick={handleOpen}
      className={`text-white mb-5 rounded-2xl cursor-pointer ${
        isOpen ? "bg-MAIN_GREEN" : "bg-[#8EB4A0] shadow-md"
      }`}
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-1">
        <div className="flex justify-center items-end p-1">
          {/* 캠핑장 이름, 구역 */}
          <h1 className="text-xl font-bold">
            {reservation.campsite.campsiteName}
          </h1>
          {<span className="pl-2 text-sm">: {reservation.room.roomName}</span>}
        </div>
        <div className="flex items-center font-semibold">
          {/* 날짜 + 더보기 */}
          {
            <span className="text-sm">
              {`${formatDate(
                reservation.reservation.startDate
              )} - ${formatSimpleDate(
                reservation.reservation.endDate
              )} · ${diffDays(
                reservation.reservation.startDate,
                reservation.reservation.endDate
              )}박 `}
            </span>
          }
          <button className="flex pl-3">
            {isOpen ? <IoIosArrowUp size="25" /> : <IoIosArrowDown size="25" />}
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef} // 아코디언 감지
        className={`text-sm ${
          !isOpen && "pb-3"
        } bg-white text-BLACK rounded-b-xl overflow-hidden transition-all duration-500 ease-in-out shadow-lg`}
      >
        <div ref={contentRef}>
          {
            <div className="">
              <div className="w-full flex justify-center rounded-2xl shadow-md">
                {/* 좌측 주소 + 사진 */}
                <div className="w-[50%] p-4 pl-8">
                  <h3 className="flex items-center gap-1 text-gray-400">
                    <FiMapPin />
                    캠핑장 위치
                  </h3>
                  <p className="pb-[12px] font-bold text-BLACK">
                    {reservation.campsite.address}
                  </p>
                  {reservation.campsite.thumbnailImageUrl ? (
                    <img
                      src={reservation.campsite.thumbnailImageUrl}
                      alt="캠핑장 사진"
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

                {/* 우측 예약 세부 사항 */}
                <div className="w-[50%] p-4 h-auto text-gray-400">
                  <h3>날짜</h3>
                  <p className="pb-[15px] font-bold text-BLACK">
                    {`${formatDate(
                      reservation.reservation.startDate
                    )} ~ ${formatSimpleDate(
                      reservation.reservation.endDate
                    )} · ${diffDays(
                      reservation.reservation.startDate,
                      reservation.reservation.endDate
                    )}박 `}
                  </p>
                  <div className="flex gap-24">
                    <div>
                      <h3>인원</h3>
                      <p className="pb-[15px] font-bold text-BLACK">
                        인원 {reservation.reservation.headCnt.toString()}
                      </p>
                      <h3>사이트</h3>
                      <p className="pb-[15px] font-bold text-BLACK">
                        {reservation.room.roomName}
                      </p>
                      <h3>가격</h3>
                      <p className="pb-[15px] font-bold text-MAIN_RED">
                        {reservation.reservation.price.toLocaleString("ko-KR")}
                        원
                      </p>
                    </div>
                    {/* @TODO: 백한테 요청하기 */}
                    {/* <div>
                    <h3>캠핑장 유형</h3>
                    <p className="pb-[15px] font-bold text-BLACK">
                      {roomInduty}
                    </p>
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
                  </div> */}
                  </div>
                  {reservation.room.supplyList &&
                    reservation.room.supplyList.length > 0 && (
                      <div className="pb-[15px]">
                        <h3>기타 정보</h3>
                        {reservation.room.supplyList.map(
                          (item: string, index: number) => (
                            <span key={index} className="font-bold text-BLACK">
                              {item}
                              {index <
                                reservation.room.supplyList.length - 1 && (
                                <span className="text-BLACK">
                                  &nbsp;·&nbsp;
                                </span>
                              )}
                            </span>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>

              {/* "지도 보기"와 "리뷰 작성하기" 버튼 추가 */}
              <div className="w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed">
                <Button
                  width="w-[40%]"
                  text="지도 보기"
                  textColor="text-[#3A2929]"
                  fontWeight="none"
                  backgroundColor="bg-[#E3F0E5]"
                  hoverTextColor="text-MAIN_GREEN"
                  hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
                  onClick={(event) => {
                    event.stopPropagation();
                    openMapModal(
                      reservation.campsiteLocation.mapY,
                      reservation.campsiteLocation.mapX,
                      reservation.campsite.campsiteName,
                      reservation.campsite.address,
                      5
                    );
                  }}
                />
                {reservation.reservation.status === "review" && (
                  <Button
                    width="w-[40%]"
                    text="리뷰 작성하기"
                    textColor="text-[#3A2929]"
                    fontWeight="none"
                    backgroundColor="bg-SUB_YELLOW"
                    hoverTextColor="text-MAIN_GREEN"
                    hoverBackgroundColor="hover:bg-HOVER_YELLOW"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/camps/review-write`, { state: dataToSend });
                    }}
                  />
                )}
                {reservation.reservation.status === "cancle" && (
                  <Button
                    width="w-[40%]"
                    text="결제 취소하기"
                    textColor="text-[#3A2929]"
                    fontWeight="none"
                    backgroundColor="bg-SUB_PINK"
                    hoverTextColor="text-MAIN_GREEN"
                    hoverBackgroundColor="hover:bg-HOVER_PINK"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleCancelPaymentModal();
                    }}
                  />
                )}
                {/* 결제 취소 모달 */}
                {cancelPaymentModal && (
                  <CancelPaymentModal
                    toggleModal={toggleCancelPaymentModal}
                    reservationId={reservation.reservation.reservationId}
                    impUid={reservation.reservation.impUid}
                  />
                )}
                {reservation.reservation.status === "reservation" && (
                  <Button
                    width="w-[40%]"
                    text="다시 예약하기"
                    textColor="text-[#3A2929]"
                    fontWeight="none"
                    backgroundColor="bg-[#D2DBF3]"
                    hoverTextColor="text-MAIN_GREEN"
                    hoverBackgroundColor="hover:bg-[#ccd2e7]"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/camps/${reservation.campsite.campsiteId}`);
                    }}
                  />
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default ReservationAccordion;
