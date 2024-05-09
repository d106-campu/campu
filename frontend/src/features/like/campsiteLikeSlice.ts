import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikesState {
  likes: Record<number, { id: number }>; // @TODO: 필요하다면 객체 안에 데이터 추가
  loading: boolean;
}

const initialState: LikesState = {
  likes: {},
  loading: false,
};

const campsiteLikeSlice = createSlice({
  name: "campsiteLike",
  initialState,
  reducers: {
    addLike(state, action: PayloadAction<number>) {
      const campsiteId = action.payload;
      state.likes[campsiteId] = { id: campsiteId }; // 좋아요 추가
    },
    removeLike(state, action: PayloadAction<number>) {
      delete state.likes[action.payload]; // 좋아요 제거
    },
    setLikes(state, action: PayloadAction<Record<number, { id: number }>>) {
      state.likes = action.payload; // 좋아요 상태 서버로부터 설정
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; // 로딩 상태 설정
    },
  },
});

export const { addLike, removeLike, setLikes, setLoading } =
  campsiteLikeSlice.actions;
export const campsiteLikeReducer = campsiteLikeSlice.reducer;
