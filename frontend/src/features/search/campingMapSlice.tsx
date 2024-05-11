import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICampsiteSimpleRes } from "@/types/search";

interface CampingMapState {
  campsiteData: ICampsiteSimpleRes[] | null;
  mapX: number | null;
  mapY: number | null;
}

const initialState: CampingMapState = {
  campsiteData: null,
  mapX: null,
  mapY: null,
};

const campingMapSlice = createSlice({
  name: "campingMap",
  initialState,
  reducers: {
    addCampingData(state, action: PayloadAction<ICampsiteSimpleRes[]>) {
      state.campsiteData = action.payload;
    },
    addMapXData(state, action: PayloadAction<number>) {
      state.mapX = action.payload;
    },
    addMapYData(state, action: PayloadAction<number>) {
      state.mapY = action.payload;
    },
    clearCampingData(state) {
      state.campsiteData = null;
    },
  },
});

export const { addCampingData, clearCampingData, addMapXData, addMapYData } =
  campingMapSlice.actions;
export const campingMapReducer = campingMapSlice.reducer;
