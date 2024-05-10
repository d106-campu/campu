import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface IOwnerCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

const OwnerCalendar = ({
  selectedDate,
  onSelectDate,
}: IOwnerCalendarProps) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(
    format(today, "yyyy년 MM월")
  ); // 현재 달 상태관리

  // 실제 날짜 연산을 수행할 때 필요한 Date 객체 생성
  const firstDayCurrentMonth = parse(currentMonth, "yyyy년 MM월", today);

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
  const handleSelectDate = (day: Date) => {
    // 선택된 날짜가 이전에 선택된 날짜와 다른 경우에만 상태 업데이트
    if (!selectedDate || selectedDate.getTime() !== day.getTime()) {
      onSelectDate(day);
    }
  };

  const getDayClass = (day: Date): string => {
    const isSelected =
      selectedDate &&
      format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    return [
      isToday(day) && "text-[#46A14F] font",
      isSelected && "bg-[#9DD8A3]", // 선택된 날짜의 배경색
      getDay(day) === 0 && "text-rose-400",
      getDay(day) === 6 && "text-blue-400",
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
          className="items-center justify-center hover:text-MAIN_GREEN"
        >
          <span className="sr-only">다음달</span>
          <FaChevronRight size={20} className="mr-6" aria-hidden="true" />
        </button>
      </div>
      {/* 요일 */}
      <div className="grid grid-cols-7 mt-10 text-lg font-semibold leading-6 text-center text-GRAY">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={index}
            className={
              index === 0 ? "text-red-400" : index === 6 ? "text-blue-400" : ""
            }
          >
            {day}
          </div>
        ))}
      </div>

      <ul className="grid grid-cols-7 mt-2 text-base text-black">
        {days.map((day, dayIdx) => {
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={`${
                dayIdx === 0 && colStartClasses[getDay(day)]
              } py-1.5`}
            >
              <div>
                <button
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={getDayClass(day)}
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
export default OwnerCalendar;
