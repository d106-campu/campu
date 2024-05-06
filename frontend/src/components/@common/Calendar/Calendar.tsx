import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  setStartDate,
  setEndDate,
  resetDate,
} from "@/features/reservation/campingDateSlice";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfDay,
  startOfToday,
} from "date-fns";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const Calendar = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(
    format(startDate ?? today, "yyyy년 MM월")
  );

  // 실제 날짜 연산을 수행할 때 필요한 Date 객체 생성
  const firstDayCurrentMonth = parse(
    currentMonth,
    "yyyy년 MM월",
    startDate || today
  );

  // 시작 날짜와 종료 날짜 사이의 모든 날짜를 포함하는 배열을 생성
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth, // 달력에서 표시할 월의 첫 날
    end: endOfMonth(firstDayCurrentMonth), // 주어진 날짜가 속한 월의 마지막 날
  });

  // 요일별 클래스 관리
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy년 MM월"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy년 MM월"));
  };

  // 날짜 설정 예시
  const handleSetStartDate = (date: Date) => {
    dispatch(setStartDate(date));
  };

  return (
    <div className="text-SUB_BLACK max-w-[60%] mx-auto pt-5">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={previousMonth}
          className="items-center justify-center  hover:text-MAIN_GREEN"
        >
          <span className="sr-only">이전달</span>
          <FaChevronLeft size={20} className="ml-6" aria-hidden="true" />
        </button>
        <h2 className="text-xl font-semibold ">
          {format(firstDayCurrentMonth, "yyyy년 MM월")}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          className="items-center justify-center  hover:text-MAIN_GREEN"
        >
          <span className="sr-only">다음달</span>
          <FaChevronRight size={20} className="mr-6" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-10 text-lg font-semibold leading-6 text-center text-GRAY">
        <div className="text-red-400">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-400">토</div>
      </div>

      <ul className="grid grid-cols-7 mt-2 text-base text-black">
        {days.map((day, dayIdx) => {
          if (startDate && endDate) {
            ``;
            console.log(
              day,
              startDate,
              endDate,
              isEqual(day, startOfDay(startDate)),
              isEqual(day, startOfDay(endDate))
            );
          }
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={`${
                dayIdx === 0 && colStartClasses[getDay(day)]
              } px-7 py-2`}
            >
              {format(day, "dd")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Calendar;
