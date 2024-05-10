import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICampsiteSimpleRes } from "@/types/search";

interface CampingMapState {
  campsiteData: ICampsiteSimpleRes[] | null;
}

const initialState: CampingMapState = {
  campsiteData: null,
};

const campingMapSlice = createSlice({
  name: "campingMap",
  initialState,
  reducers: {
    addCampingData(state, action: PayloadAction<ICampsiteSimpleRes[]>) {
      state.campsiteData = action.payload;
    },
    clearCampingData(state) {
      state.campsiteData = null;
    },
  },
});

export const { addCampingData, clearCampingData } = campingMapSlice.actions;
export const campingMapReducer = campingMapSlice.reducer;
