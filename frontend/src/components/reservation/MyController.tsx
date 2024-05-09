import { useEffect, useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import { formatSimpleDate } from "@/utils/formatDateTime";
import { FaArrowRotateRight } from "react-icons/fa6";
import { PiInfo } from "react-icons/pi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { diffDays } from "@/utils/diffDays";
import Calendar from "@/components/@common/Calendar/Calendar";
import CalendarSubmit from "../@common/Calendar/CalendarSubmit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setHeadCount } from "@/features/reservation/HeadCountSlice";
import {
  setStartDate,
  setEndDate,
} from "@/features/reservation/campingDateSlice";

const MyController = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );
  const { headCount } = useSelector((state: RootState) => state.headCount);

  const [localHeadCount, setLocalHeadCount] = useState<number>(headCount); // 인원수

  const [scheduleModal, setScheduleModal] = useState<boolean>(false); // 일정 모달 상태관리
  const [headCountModal, setHeadCountModal] = useState<boolean>(false); // 인원수 모달 상태관리

  const [initialStartDate, setInitialStartDate] = useState<Date | null>(
    startDate
  ); // 시작일 초기값
  const [initialEndDate, setInitialEndDate] = useState<Date | null>(endDate); // 종료일 초기값
  const initialHeadCount: number = headCount; // 인원수 초기값

  const toggleScheduleModal = () => setScheduleModal(!scheduleModal);
  const toggleHeadCountModal = () => setHeadCountModal(!headCountModal);

  const increasePeople = () => setLocalHeadCount(localHeadCount + 1);
  const decreasePeople = () =>
    localHeadCount > 1 && setLocalHeadCount(localHeadCount - 1);

  useEffect(() => {
    setInitialStartDate(startDate);
    setInitialEndDate(endDate);
  }, []);

  const headCountSubmit = () => {
    dispatch(setHeadCount(localHeadCount));
    // @TODO: 백에 방 조회 API 요청 다시 보내기
  };

  const calendarSubmit = () => {
    setInitialStartDate(startDate);
    setInitialEndDate(endDate);
    // @TODO: 백에 방 조회 API 요청 다시 보내기
  };

  // 일정 초기화
  const resetCalendar = () => {
    if (initialStartDate && initialEndDate) {
      dispatch(setStartDate(initialStartDate));
      dispatch(setEndDate(initialEndDate));
    }
  };

  return (
    <>
      <div className="flex justify-around items-stretch border-2 rounded-xl border-[#C9C9C9] text-center font-bold w-[96%] mx-auto">
        <div
          onClick={() => toggleScheduleModal()}
          className="flex-1 my-auto py-3 rounded-xl cursor-pointer hover:bg-SUB_GREEN_01"
        >
          {formatSimpleDate(initialStartDate)} -{" "}
          {formatSimpleDate(initialEndDate)} ·&nbsp;
          {diffDays(initialStartDate, initialEndDate)}박
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
              <Calendar />
            </div>
            <button
              onClick={resetCalendar}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">일정 초기화</span>
            </button>
            <CalendarSubmit
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
