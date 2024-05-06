import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  setStartDate,
  setEndDate,
  resetDate,
} from "@/features/reservation/campingDateSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  // 날짜 설정 예시
  const handleSetStartDate = (date: Date) => {
    dispatch(setStartDate(date));
  };

  return <></>;
};
export default Calendar;
