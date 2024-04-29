import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOwnerTabState {
  tab: '내 캠핑장' | '예약 관리' | '리뷰';
}

const initialState: IOwnerTabState = {
  tab: '내 캠핑장',
};

const OwnerTabSlice = createSlice({
  name: 'ownerTab',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<'내 캠핑장' | '예약 관리' | '리뷰'>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = OwnerTabSlice.actions;
export const ownerTabReducer = OwnerTabSlice.reducer;
