import { useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Button from "@/components/@common/Button/Button";
import { FaArrowRotateRight } from "react-icons/fa6";
import { PiInfo } from "react-icons/pi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

interface IMyControllerProps {
  headCount: number;
  startDate: string;
  endDate: string;
}

const MyController = ({
  headCount,
  startDate,
  endDate,
}: IMyControllerProps) => {
  const [scheduleModal, setScheduleModal] = useState<boolean>(false); // 일정 모달 상태관리
  const [headCountModal, setHeadCountModal] = useState<boolean>(false); // 인원수 모달 상태관리
  const [peopleCount, setPeopleCount] = useState<number>(2); // 인원수 계산

  const toggleScheduleModal = () => {
    setScheduleModal(!scheduleModal);
  };

  const toggleHeadCountModal = () => {
    setHeadCountModal(!headCountModal);
  };

  // Date 객체로 변환
  const startDay = new Date(startDate);
  const endDay = new Date(endDate);

  // 시작일과 종료일 사이의 일수 계산
  const diffTime = Math.abs(endDay - startDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 날짜 포맷 변경
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  const increasePepole = () => {
    setPeopleCount(peopleCount + 1);
  };
  const decreasePepole = () => {
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  return (
    <>
      <div className="flex justify-around items-stretch border-2 rounded-xl border-[#C9C9C9] text-center text-lg font-bold">
        <div
          onClick={() => toggleScheduleModal()}
          className="flex-1 my-auto py-3 rounded-xl cursor-pointer hover:bg-SUB_GREEN_01"
        >
          {formatDate(startDay)} ~ {formatDate(endDay)} · {diffDays}박
        </div>
        <div className="border-l-2 border-[#C9C9C9] mx-2" />
        <div
          onClick={() => toggleHeadCountModal()}
          className="flex-1 my-auto py-3 rounded-xl cursor-pointer hover:bg-SUB_GREEN_01"
        >
          인원 {headCount}명
        </div>
      </div>

      {/* 모달 - 일정 변경 */}
      {scheduleModal && (
        <Modal width="w-[60%]" onClose={toggleScheduleModal} title="일정 선택">
          <div>
            {/* @TODO: 달력 넣기 */}
            {/* @TODO: 초기화 버튼 */}
            <button className="flex items-center gap-2 cursor-pointer p-2">
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">일정 초기화</span>
            </button>
            {/* @TODO: 버튼에 변경된 날짜 넣기 */}
            <Button
              width="w-full"
              height="h-12"
              text="변경된 날짜"
              textSize="text-base"
            />
          </div>
        </Modal>
      )}

      {/* 모달 - 인원수 변경 */}
      {headCountModal && (
        <Modal
          width="w-[60%]"
          onClose={toggleHeadCountModal}
          title="인원수 선택"
        >
          <div>
            <div className="flex flex-col items-center text-BLACK pt-3">
              <div className="flex gap-3 p-3 bg-[#f1f1f1] rounded-xl text-xs w-[60%] m-2">
                <PiInfo size={25} />
                <p>
                  기준 인원 초과 시 추가요금이 발생할 수 있습니다. <br />만 5세
                  미만의 유아는 무료 입장이며, 만 5세 이상의 아동은 추가 요금이
                  다를 수 있습니다.
                  <br />
                  자세한 사항은 캠핑장 이용안내 및 공지사항을 확인해주세요.
                </p>
              </div>

              <div className="flex justify-between w-[60%] pt-3">
                <p className="p-3 text-xl">인원</p>
                <div className="flex items-center">
                  <AiOutlineMinusCircle
                    size={30}
                    onClick={decreasePepole}
                    className="text-MAIN_GREEN cursor-pointer"
                  />
                  <p className="p-3 text-xl">{peopleCount}</p>
                  <AiOutlinePlusCircle
                    size={30}
                    onClick={increasePepole}
                    className="text-MAIN_GREEN cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setPeopleCount(headCount)}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">인원수 초기화</span>
            </button>
            {/* @TODO: 버튼에 변경된 인원 수 넣기 */}
            <Button
              width="w-full"
              height="h-12"
              text={`인원 ${peopleCount}명`}
              textSize="text-base"
            />
          </div>
        </Modal>
      )}
    </>
  );
};
export default MyController;
