import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampingDateState {
  startDate: Date | null;
  endDate: Date | null;
}

const initialState: CampingDateState = {
  startDate: null,
  endDate: null,
};

const campingDateSlice = createSlice({
  name: "campingDate",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
    resetDate: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const { setStartDate, setEndDate, resetDate } = campingDateSlice.actions;
export const campingDateReducer = campingDateSlice.reducer;
