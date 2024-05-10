import { useCallback } from "react";
import { useMemo } from "react";
import { formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";
import Button from "@/components/@common/Button/Button";

interface ICalendarSubmitProps {
  startDate: Date | null;
  endDate: Date | null;
  onClick: () => void;
}

const CalendarSubmit = ({
  startDate,
  endDate,
  onClick,
}: ICalendarSubmitProps) => {
  const isDisabled = useMemo(() => {
    return !startDate || !endDate;
  }, [startDate, endDate]);

  const selectedDateText = useMemo(() => {
    if (!startDate || !endDate) return "날짜를 선택해주세요";
    if (startDate && endDate) {
      return `${formatSimpleDate(startDate)} - ${formatSimpleDate(
        endDate
      )} ·  ${diffDays(startDate, endDate)}박`;
    }
  }, [startDate, endDate]);

  // 조건부 클릭 이벤트 핸들러
  const handleOnClick = useCallback(() => {
    if (!isDisabled) onClick();
  }, [isDisabled, onClick]);

  return (
    <div>
      <p className="text-end"></p>
      <Button
        onClick={handleOnClick}
        width="w-full"
        height="h-12"
        textSize="text-lg"
        text={`${selectedDateText ? selectedDateText : "날짜를 선택해주세요"}`}
        disabled={isDisabled}
      />
    </div>
  );
};

export default CalendarSubmit;
