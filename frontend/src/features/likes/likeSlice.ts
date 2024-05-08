import { createSlice } from "@reduxjs/toolkit";

interface LikesState {
  likes: { [campsiteId: number]: boolean }; // 각 캠핑장의 ID를 키로 하고 좋아요 상태를 값으로 갖는 객체
  loading: boolean;
}

const initialState: LikesState = {
  likes: {},
  loading: false,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const { campsiteId } = action.payload;
      state.likes[campsiteId] = !state.likes[campsiteId]; // 상태 토글
    },
    setLiked(state, action) {
      const { campsiteId, liked } = action.payload;
      state.likes[campsiteId] = liked; // 좋아요 상태 서버로부터 설정
    },
    setLoading(state, action) {
      state.loading = action.payload; // 로딩 상태 설정
    },
  },
});

export const { toggleLike, setLiked, setLoading } = likeSlice.actions;
export const likeReducer = likeSlice.reducer;
