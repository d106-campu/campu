import { dayOfWeekend } from "@/utils/dayOfWeekend";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string;
  subRegion: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  keyword: string | null;
}

const weekendDates = dayOfWeekend();

const initialState: ISearchState = {
  region: "서울",
  subRegion: "강동구",
  startDate: weekendDates.saturday,
  endDate: weekendDates.sunday,
  numberOfPeople: 2,
  keyword: null,
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
    setSubRegion(state, action: PayloadAction<string>) {
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
      state.region = "서울";
      state.subRegion = "강동구";
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
