import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  setStartDate,
  setEndDate,
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
  startOfToday,
  isWithinInterval,
} from "date-fns";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

// @TODO:윤년 추가하기
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

  // 날짜 선택 함수
  const handleSelectDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    // button 선택 시 근처(감싸고 있는) li tag 설정
    const dateElement = event.currentTarget.closest("li");

    // li tag가 없거나 data-index가 없는 경우 return
    if (!dateElement || !dateElement.dataset.index) return;

    // 시작 날짜와 끝 날짜를 선택하여 설정
    const dateIndex = parseInt(dateElement.dataset.index);
    const selectedDate = days[dateIndex];

    // 1. startDate와 endDate가 둘 다 있을 경우
    if (startDate && endDate) {
      dispatch(setStartDate(selectedDate));
      dispatch(setEndDate(null));
      return;
    }

    // 2. startDate가 있을 때 endDate가 없는 경우
    if (startDate) {
      // 선택한 날짜가 시작 날짜보다 이전인 경우
      if (startDate > selectedDate) {
        dispatch(setStartDate(selectedDate));
        dispatch(setEndDate(startDate));
        return;
      }
      dispatch(setEndDate(selectedDate));
      return;
    }

    // 3. startDate와 endDate가 둘 다 없는 경우
    dispatch(setStartDate(selectedDate));
  };

  const isDateInBetweenStartAndEnd = (
    dateToCheck: Date,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate && endDate) {
      // Interval 객체 생성
      const interval = { start: startDate, end: endDate };
      // isWithinInterval 함수를 사용하여 dateToCheck가 interval 내에 있는지 확인
      return isWithinInterval(dateToCheck, interval);
    }
    return false;
  };

  const getDayClass = (
    day: Date,
    startDate: Date | null,
    endDate: Date | null,
    firstDayCurrentMonth: Date
  ): string => {
    const isStart = startDate && isEqual(day, startDate);
    const isEnd = endDate && isEqual(day, endDate);
    const isInBetween =
      startDate &&
      endDate &&
      isWithinInterval(day, { start: startDate, end: endDate });

    return [
      isToday(day) && "text-MAIN_GREEN",
      !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && "text-GRAY",
      startDate &&
        !isEqual(day, startDate) &&
        endDate &&
        !isEqual(day, endDate) &&
        "hover:bg-gray-200",
      isStart || isEnd || (isToday(day) && "font-bold"),
      isStart && "bg-[#9DD8A3] rounded-full",
      endDate && isEqual(day, endDate) && "bg-[#9DD8A3]",
      getDay(day) === 0 && (isStart || isEnd ? "text-BLACK" : "text-rose-400"),
      getDay(day) === 6 && (isStart || isEnd ? "text-BLACK" : "text-blue-400"),
      isInBetween && "text-BLACK bg-[#E1F9E3]",
      "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="text-SUB_BLACK max-w-[60%] mx-auto pt-5">
      {/* 연도 + 월 + 버튼 */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={previousMonth}
          className="items-center justify-center hover:text-MAIN_GREEN"
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
      {/* 요일 */}
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
          const isBetween = isDateInBetweenStartAndEnd(day, startDate, endDate);
          const isStart = startDate && isEqual(day, startDate);
          const isEnd = endDate && isEqual(day, endDate);
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={`${
                dayIdx === 0 && colStartClasses[getDay(day)]
              } py-1.5`}
            >
              <div
                className={`${isBetween ? "bg-[#E1F9E3]" : ""} ${
                  isStart ? "rounded-l-full" : ""
                } ${isEnd ? "rounded-r-full" : ""}`}
              >
                <button
                  type="button"
                  onClick={handleSelectDate}
                  className={getDayClass(
                    day,
                    startDate,
                    endDate,
                    firstDayCurrentMonth
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Calendar;
