interface IAlertMessageProps {
  nickname: string;
  time: number;
  campingSite: string;
  campingZone: string;
  total: number;
  schedule: string;
}
const AlertMessage = ({
  nickname,
  time,
  campingSite,
  campingZone,
  total,
  schedule,
}: IAlertMessageProps) => {
  return (
    <div className="p-5 text-sm text-BLACK bg-SUB_GREEN_01 rounded-sm">
      <>
        <p className="text-UNIMPORTANT_TEXT_02 text-xs">{time}일 전</p>
        <p>
          {nickname}님이 기다리신
          <span className="text-MAIN_GREEN"> {campingSite}</span>의
          빈자리가나왔어요!
        </p>
        <p>지금 바로 예약 해보세요 😊</p>
        <div className="text-xs py-2">
          <p>
            {campingSite} - {campingZone}
          </p>
          <p>
            인원 {total}명 / {schedule}
          </p>
        </div>

        <p>서둘러 주세요, 자리가 금방 차버릴 수 있어요!</p>
        <p className="text-MAIN_GREEN">클릭 시 예약 페이지로 이동합니다.</p>
      </>
    </div>
  );
};
export default AlertMessage;
