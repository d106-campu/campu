import { diffDays } from "@/utils/diffDays";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { scrollToTop } from "@/utils/scrollToTop";
import { useNavigate } from "react-router-dom";

interface IAlertMessageProps {
  time: number;
  campId: number;
  campingSite: string;
  roomName: string;
  headCnt: number;
  startDate: string;
  endDate: string;
}
const AlertMessage = ({
  time,
  campId,
  campingSite,
  roomName,
  headCnt,
  startDate,
  endDate,
}: IAlertMessageProps) => {
  // @TODO: 스토어에서 유저 닉네임 가져오기
  const nickname = "캐치캠핑핑핑";

  const navigate = useNavigate();
  const goToRevservation = (campId: number) => {
    navigate(`/camps/${campId}`);
    scrollToTop();
  };

  return (
    <div
      onClick={() => goToRevservation(campId)}
      className="pb-3 cursor-pointer"
    >
      <div className="px-5 pb-5 pt-3 text-sm text-SUB_BLACK bg-SUB_GREEN_01 rounded-lg">
        <>
          <p className="text-UNIMPORTANT_TEXT_02 text-xs text-end pb-2 pt-0">
            {time}일 전
          </p>
          <p>
            {nickname}님이 기다리신
            <span className="text-MAIN_GREEN font-bold"> {campingSite}</span>의
            빈자리가 나왔어요! 지금 바로 예약 해보세요 😊
          </p>
          <div className="py-2 text-xs font-bold text-black">
            <ul className="pl-3 list-disc list-outside ">
              <li>
                {campingSite} - {roomName}{" "}
              </li>
              <li>
                {formatDate(startDate)} - {formatSimpleDate(endDate)} ·{" "}
                {diffDays(startDate, endDate)}박
              </li>
              <li>인원 {headCnt}명</li>
            </ul>
          </div>

          <p>서둘러 주세요, 자리가 금방 차버릴 수 있어요!</p>
          <p className="text-MAIN_GREEN text-xs pt-1">
            클릭 시 예약 페이지로 이동합니다.
          </p>
        </>
      </div>
    </div>
  );
};
export default AlertMessage;
