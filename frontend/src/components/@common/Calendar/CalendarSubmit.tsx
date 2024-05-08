import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";
import Button from "@/components/@common/Button/Button";
import {
  setEndDate,
  setStartDate,
} from "@/features/reservation/campingDateSlice";

const CalendarSubmit = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  const isDisable = useMemo(() => {
    return !startDate && !endDate;
  }, [startDate, endDate]);

  const selectedDateText = useMemo(() => {
    if (!startDate && !endDate) return null;

    if (startDate && !endDate) {
      return formatSimpleDate(startDate);
    }

    if (startDate && endDate) {
      return `${formatSimpleDate(startDate)} - ${formatSimpleDate(
        endDate
      )} ·  ${diffDays(startDate, endDate)}박`;
    }
  }, [startDate, endDate]);

  // 스토어에 날짜 저장
  const submitToStore = () => {
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  };

  return (
    <div>
      <Button
        width="w-full"
        height="h-12"
        textSize="text-lg"
        text={` ${
          selectedDateText ? selectedDateText : "날짜를 선택해주세요."
        }`}
        disabled={isDisable}
        onClick={submitToStore}
      ></Button>
    </div>
  );
};

export default CalendarSubmit;
