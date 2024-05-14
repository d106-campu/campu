import { dayOfWeekend } from "@/utils/dayOfWeekend";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string | null;
  subRegion: string | null;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
}

const weekendDates = dayOfWeekend();

const initialState: ISearchState = {
  region: null,
  subRegion: null,
  startDate: weekendDates.saturday,
  endDate: weekendDates.sunday,
  numberOfPeople: 2,
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string | null>) {
      state.region = action.payload;
    },
    setSubRegion(state, action: PayloadAction<string | null>) {
      state.subRegion = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    setPeople(state, action: PayloadAction<number>) {
      state.numberOfPeople = action.payload;
    },

    // 검색바를 초기화
    clearSearchData(state) {
      state.region = null;
      state.subRegion = null;
      state.numberOfPeople = 2;
      state.startDate = weekendDates.saturday;
      state.endDate = weekendDates.sunday;
    },
  },
});

export const {
  setRegion,
  setSubRegion,
  setStartDate,
  setEndDate,
  setPeople,
  clearSearchData,
} = searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;
