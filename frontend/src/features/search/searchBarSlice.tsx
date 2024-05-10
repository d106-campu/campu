import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  region: string | null;
  subRegion: string | null;
}

const initialState: ISearchState = {
  region: null,
  subRegion: null,
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

    // 검색바를 초기화
    clearSearchData(state) {
      state.region = null;
      state.subRegion = null;
    },
  },
});

export const { setRegion, setSubRegion, clearSearchData } =
  searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;
