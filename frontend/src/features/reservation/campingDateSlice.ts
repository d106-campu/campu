import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: null,
  endDate: null,
};

const campingDateSlice = createSlice({
  name: "campingDate",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
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
