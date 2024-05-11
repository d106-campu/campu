import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMarkerState {
  facltNm: string | null;
}

const initialState: IMarkerState = {
  facltNm: null,
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    toggleMarker(state, action: PayloadAction<string | null>) {
      state.facltNm = action.payload;
    },
    clearMarker(state) {
      state.facltNm = null;
    },
  },
});

export const { toggleMarker, clearMarker } = markersSlice.actions;
export const markersReducer = markersSlice.reducer;
