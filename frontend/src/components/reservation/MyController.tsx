import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import Calendar from "@/components/@common/Calendar/Calendar";
import CalendarSubmit from "@/components/@common/Calendar/CalendarSubmit";
import { formatSimpleDate, dateStringToDate, dateToDateString } from "@/utils/formatDateTime";
import { FaArrowRotateRight } from "react-icons/fa6";
import { PiInfo } from "react-icons/pi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { diffDays } from "@/utils/diffDays";
import { setHeadCount } from "@/features/reservation/HeadCountSlice";
import {
  setStartDate,
  setEndDate,
} from "@/features/reservation/campingDateSlice";

const MyController = () => {
  // 모달 상태관리
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [headCountModal, setHeadCountModal] = useState<boolean>(false);
  const toggleScheduleModal = () => setScheduleModal(!scheduleModal);
  const toggleHeadCountModal = () => setHeadCountModal(!headCountModal);

  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );
  const { headCount } = useSelector((state: RootState) => state.headCount);

  // 스토어에서 가져온 문자열 날짜를 Date 객체로 변환
  const initialStartDate = dateStringToDate(startDate);
  const initialEndDate = dateStringToDate(endDate);

  // 달력에서 선택한 일정
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initialStartDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(initialEndDate);

  // 일정 스토어에 저장
  const calendarSubmit = () => {
    // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
    const formattedStartDate = dateToDateString(localStartDate);
    const formattedEndDate = dateToDateString(localEndDate);

    // 변환된 문자열을 Redux 스토어에 저장
    dispatch(setStartDate(formattedStartDate));
    dispatch(setEndDate(formattedEndDate));

    // @TODO: 백에 방 조회 API 요청 다시 보내기
  };

  // 인원수
  const [localHeadCount, setLocalHeadCount] = useState<number>(headCount);

  // 인원수 초기값
  const initialHeadCount: number = headCount;

  // 인원수 증감 함수
  const increasePeople = () => setLocalHeadCount(localHeadCount + 1);
  const decreasePeople = () =>
    localHeadCount > 1 && setLocalHeadCount(localHeadCount - 1);

  // 인원수 스토어에 저장
  const headCountSubmit = () => {
    dispatch(setHeadCount(localHeadCount));
    // @TODO: 백에 방 조회 API 요청 다시 보내기
  };

  useEffect(() => {
    // 확인용 로직
    console.log("시작일", localStartDate);
    console.log("종료일", localEndDate);
    console.log("스토어 시작일", startDate);
    console.log("스토어 종료일", endDate);
    console.log("인원수", localHeadCount);
  }, [localStartDate, localEndDate, localHeadCount]);

  // 일정 초기화
  const resetCalendar = () => {};

  return (
    <>
      <div className="flex justify-around items-stretch border-2 rounded-xl border-[#C9C9C9] text-center font-bold w-[96%] mx-auto">
        <div
          onClick={() => toggleScheduleModal()}
          className="flex-1 my-auto py-3 rounded-xl cursor-pointer hover:bg-SUB_GREEN_01"
        >
          {!initialStartDate || !initialEndDate ? (
            <>날짜를 선택해주세요</>
          ) : (
            <>
              {formatSimpleDate(initialStartDate)} -{" "}
              {formatSimpleDate(initialEndDate)} ·&nbsp;
              {diffDays(initialStartDate, initialEndDate)}박
            </>
          )}
        </div>
        <div className="border-l-2 border-[#C9C9C9] mx-2" />
        <div
          onClick={toggleHeadCountModal}
          className="flex-1 my-auto py-3 rounded-xl cursor-pointer hover:bg-SUB_GREEN_01"
        >
          인원 {headCount}명
        </div>
      </div>

      {/* 모달 - 일정 변경 */}
      {scheduleModal && (
        <Modal width="w-[55%]" onClose={toggleScheduleModal} title="일정 선택">
          <div>
            <div className="w-[70%] h-[375px] mx-auto">
              <Calendar
                startDate={localStartDate}
                endDate={localEndDate}
                setStartDate={setLocalStartDate}
                setEndDate={setLocalEndDate}
              />
            </div>
            <button
              onClick={resetCalendar}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">일정 초기화</span>
            </button>
            <CalendarSubmit
              startDate={localStartDate}
              endDate={localEndDate}
              onClick={() => {
                calendarSubmit();
                toggleScheduleModal();
              }}
            />
          </div>
        </Modal>
      )}

      {/* 모달 - 인원수 변경 */}
      {headCountModal && (
        <Modal
          width="w-[55%]"
          onClose={toggleHeadCountModal}
          title="인원수 선택"
        >
          <div>
            <div className="flex flex-col items-center text-BLACK pt-3">
              <div className="flex gap-3 p-3 bg-[#f1f1f1] rounded-xl text-xs w-[65%] m-2 text-SUB_BLACK">
                <PiInfo size={25} />
                <p>
                  기준 인원 초과 시 추가요금이 발생할 수 있습니다. <br />만 5세
                  미만의 유아는 무료 입장이며, 만 5세 이상의 아동은 추가 요금이
                  다를 수 있습니다.
                  <br />
                  자세한 사항은 캠핑장 이용안내 및 공지사항을 확인해주세요.
                </p>
              </div>

              <div className="flex justify-between w-[65%] pt-3">
                <p className="p-3 text-xl">인원</p>
                <div className="flex items-center">
                  <AiOutlineMinusCircle
                    size={30}
                    onClick={decreasePeople}
                    className="text-MAIN_GREEN cursor-pointer"
                  />
                  <p className="p-3 text-xl">{localHeadCount}</p>
                  <AiOutlinePlusCircle
                    size={30}
                    onClick={increasePeople}
                    className="text-MAIN_GREEN cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setLocalHeadCount(initialHeadCount)}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">인원수 초기화</span>
            </button>
            <Button
              width="w-full"
              height="h-12"
              text={`인원 ${localHeadCount}명`}
              textSize="text-lg"
              onClick={() => {
                toggleHeadCountModal();
                headCountSubmit();
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
export default MyController;
