import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string | null;
  subRegion: string | null;
  date: string | null;
  numberOfPeople: number | null;
  keyword: string | null;
}

const initialState: ISearchState = {
  region: null,
  subRegion: null,
  date: null,
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
    setDate(state, action: PayloadAction<string | null>) {
      state.date = action.payload;
    },
    setPeople(state, action: PayloadAction<number | null>) {
      state.numberOfPeople = action.payload;
    },
    setKeyword(state, action: PayloadAction<string | null>) {
      state.keyword = action.payload;
    },
  },
});

export const { setRegion, setSubRegion, setDate, setPeople, setKeyword } =
  searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;
