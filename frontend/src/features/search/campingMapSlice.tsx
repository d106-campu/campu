import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICampingGround } from "@/types/search";

interface CampingState {
  campingData: ICampingGround[];
}

const initialState: CampingState = {
  campingData: [],
};

const campingMapSlice = createSlice({
  name: "campingMap",
  initialState,
  reducers: {
    addCampingData(state, action: PayloadAction<ICampingGround[]>) {
      state.campingData = action.payload;
    },
  },
});

export const { addCampingData } = campingMapSlice.actions;
export const campingMapReducer = campingMapSlice.reducer;
