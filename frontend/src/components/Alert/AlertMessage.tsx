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

  // @TODO: 클릭 시 해당 예약 페이지로 이동 
  return (
    <div className="pb-3">
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
          <div className="text-xs py-2 font-bold text-black">
            <p>
              {campingSite} - {campingZone}
              <br />
              인원 {total}명 / {schedule}
            </p>
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
