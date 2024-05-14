import { dayOfWeekend } from "@/utils/dayOfWeekend";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string | null;
  subRegion: string | null;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  keyword: string | null;
}

const weekendDates = dayOfWeekend();

const initialState: ISearchState = {
  region: null,
  subRegion: null,
  startDate: weekendDates.saturday,
  endDate: weekendDates.sunday,
  numberOfPeople: 2,
  keyword: null,
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
    setKeyword(state, action: PayloadAction<string | null>) {
      state.keyword = action.payload;
    },

    // 검색바를 초기화
    clearSearchData(state) {
      state.region = null;
      state.subRegion = null;
      state.numberOfPeople = 2;
      state.startDate = weekendDates.saturday;
      state.endDate = weekendDates.sunday;
      state.keyword = null;
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
  setKeyword,
} = searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;
