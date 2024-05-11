import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dayOfWeekend } from "@/utils/dayOfWeekend";

interface CampingDateState {
  startDate: string | null;
  endDate: string | null;
}

// 초기 날짜를 계산
const weekendDates = dayOfWeekend();

const initialState: CampingDateState = {
  startDate: weekendDates.saturday, // 그 주의 토요일
  endDate: weekendDates.sunday, // 그 주의 일요일
};

const campingDateSlice = createSlice({
  name: "campingDate",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    resetDate: (state) => {
      state.startDate = weekendDates.saturday;
      state.endDate = weekendDates.sunday;
    },
  },
});

export const { setStartDate, setEndDate, resetDate } = campingDateSlice.actions;
export const campingDateReducer = campingDateSlice.reducer;
