import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  headCount: 2,
};

const HeadCountSlice = createSlice({
  name: "headCount",
  initialState,
  reducers: {
    setHeadCount: (state, action: PayloadAction<number>) => {
      state.headCount = action.payload;
    },
  },
});

export const { setHeadCount } = HeadCountSlice.actions;
export const headCountReducer = HeadCountSlice.reducer;
