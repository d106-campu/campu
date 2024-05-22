import { createSlice } from "@reduxjs/toolkit";

interface CampgroundState {
  campsiteName: string | null;
  campsiteId: number | null;
}

const initialState: CampgroundState = {
  campsiteName: null,
  campsiteId: null,
};

const campsiteSlice = createSlice({
  name: "ownerSide",
  initialState,
  reducers: {
    setSelectCampsite: (state, action) => {
      state.campsiteName = action.payload?.campsiteName || null;
      state.campsiteId = action.payload?.campsiteId || null;
    },
  },
});

export const { setSelectCampsite } = campsiteSlice.actions;
export const ownerSideReducer = campsiteSlice.reducer;
