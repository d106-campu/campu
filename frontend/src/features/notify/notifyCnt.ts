import { createSlice } from "@reduxjs/toolkit";

interface INotifyCnt {
  newNotifyCnt: number;
}

const initialState: INotifyCnt = {
  newNotifyCnt: 0,
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addNewNotifyCnt: (state) => {
      state.newNotifyCnt += 1;
    },
    resetNewNotifyCnt: (state) => {
      state.newNotifyCnt = 0;
    },
  },
});

export const { addNewNotifyCnt, resetNewNotifyCnt } = notifySlice.actions;
export const notifyCntReducer = notifySlice.reducer;
