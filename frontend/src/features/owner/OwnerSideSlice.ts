import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCampground: null,
};

const campgroundSlice = createSlice({
  name: "ownerSide",
  initialState,
  reducers: {
    setSelectedCampground: (state, action) => {
      state.selectedCampground = action.payload;
    },
  },
});

export const { setSelectedCampground } = campgroundSlice.actions;
export const ownerSideReducer = campgroundSlice.reducer;

export default configureStore({
  reducer: {
    campground: campgroundSlice.reducer,
  },
});
