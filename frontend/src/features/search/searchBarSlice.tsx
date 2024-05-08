import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string | null;
  subRegion: string | null;
  startDate: string | null;
  endDate: string | null;
  numberOfPeople: number | null;
  keyword: string | null;
}

const initialState: ISearchState = {
  region: null,
  subRegion: null,
  startDate: null,
  endDate: null,
  numberOfPeople: null,
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
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
    },
    setPeople(state, action: PayloadAction<number | null>) {
      state.numberOfPeople = action.payload;
    },
    setKeyword(state, action: PayloadAction<string | null>) {
      state.keyword = action.payload;
    },
    // 검색바를 초기화
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetState(_state) {
      return initialState;
    },
  },
});

export const {
  setRegion,
  setSubRegion,
  setStartDate,
  setEndDate,
  setPeople,
  setKeyword,
  resetState,
} = searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;
