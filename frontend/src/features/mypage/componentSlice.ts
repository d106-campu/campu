import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IComponentState {
  value: string;
}

const initialState: IComponentState = {
  value: "MyReservation",
};

const selectedCompSlice = createSlice({
  name: "selectedComp",
  initialState,
  reducers: {
    setSelectedComp: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedComp } = selectedCompSlice.actions;
export const selectedCompReducer = selectedCompSlice.reducer;
