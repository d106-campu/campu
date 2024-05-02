import { useState } from "react";
import Button from "@/components/@common/Button/Button";
import Kakao_logo from "@/assets/images/kakao_logo.png";
import stamp from "@/assets/images/stamp.png";
import { FiMapPin } from "react-icons/fi";
import { FaRegFaceSmile, FaRegFaceSmileWink } from "react-icons/fa6";

interface IReservationItemProps {
  id: number;
  image: string;
  campsite_faclt_nm: string;
  campsite_tel: string;
  campsite_addr1: string;
  campsite_addr2: string;
  roomName: string;
  roomInduty: string;
  supplyList: string[];
  headCnt: number;
  price: number;
  startDate: string;
  endDate: string;
  checkIn: string;
  checkOut: string;
  status: reservationStatusType;
}

type reservationStatusType = "proceeding" | "complete";

const ReservationItem = ({ data }: { data: IReservationItemProps }) => {
  // @TODO: 스토어에서 닉네임 가져오기
  const nickname = "캐치캠핑핑핑";

  const [status, setStatus] = useState<reservationStatusType>("proceeding"); // 예약 진행 상태

  const proceedingMessage = `${nickname}님, 예약 정보를 확인 후 결제를 진행해주세요`;
  const completeMessage = `${nickname}님, 예약이 정상적으로 완료되었습니다! 즐거운 캠핑되세요`;

  return (
    <div className="relative">
      <div className="pl-3 pb-2">
        <h1 className="text-2xl font-bold">
          {status === "proceeding" ? "예약 진행 중" : "예약 완료"}
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
            <h2 className="text-2xl font-bold pl-3">
              {data.campsite_faclt_nm}
            </h2>
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
            {data.campsite_addr1} {data.campsite_addr2}
          </p>
          <img
            src={data.image}
            alt={`${data.campsite_faclt_nm} ${data.roomName}`}
            className="w-full h-52 object-cover object-center rounded-xl"
          />
        </div>

        {/* 구분선 */}
        <div className="w-[2.5%] border-r-[1px] mr-6" />

        {/* 예약 세부 사항 */}
        <div className="w-[50%] p-4 h-auto text-gray-400">
          <h3>날짜</h3>
          <p className="pb-[15px] font-bold text-BLACK">
            {data.campsite_addr1} {data.campsite_addr2}
          </p>
          <div className="flex gap-24">
            <div>
              <h3>인원</h3>
              <p className="pb-[15px] font-bold text-BLACK">
                인원 {data.headCnt}
              </p>
              <h3>사이트</h3>
              <p className="pb-[15px] font-bold text-BLACK">{data.roomName}</p>
            </div>
            <div>
              <h3>캠핑장 유형</h3>
              <p className="pb-[15px] font-bold text-BLACK">
                {data.roomInduty}
              </p>
              <h3>입실·퇴실 시간</h3>
              <p className="pb-[15px] font-bold text-BLACK">
                {data.checkIn} - {data.checkOut}
              </p>
            </div>
          </div>
          <div className="pb-[15px]">
            <h3>기타 정보</h3>
            {data.supplyList.map((item, index) => (
              <span key={index} className="font-bold text-BLACK">
                {item}
                {index < data.supplyList.length - 1 && (
                  <span className="text-BLACK">&nbsp;·&nbsp;</span>
                )}
              </span>
            ))}
          </div>
          <h3>가격</h3>
          <p className="pb-[15px] font-bold text-MAIN_RED">
            {data.price.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>

      {/* 버튼 + 절취선 */}
      <div className="w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed">
        <Button
          width="w-[40%]"
          text="지도 보기"
          textColor="text-[#3A2929]"
          fontWeight="none"
          backgroundColor="bg-[#E3F0E5]"
          hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
        />
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
            onClick={() => setStatus("complete")}
          />
        ) : (
          <Button
            width="w-[40%]"
            text="결제 취소하기"
            textColor="text-[#3A2929]"
            fontWeight="none"
            backgroundColor="bg-SUB_PINK"
            hoverBackgroundColor="hover:bg-HOVER_PINK"
            onClick={() => setStatus("complete")}
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
