import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  // 리듀서는 특정 액션에 따라 상태를 어떻게 변화할 것인지 관리하는 곳
  // 키-밸류로 추가하면됨
  reducer: {
    // 리듀서 설정하는 곳
  },
});

export type AppDispatch = typeof store.dispatch; // 디스패치 함수의 타입을 설정하여 액션을 디스패치할 수 있도록 하기
export type RootState = ReturnType<typeof store.getState>; // 스토어의 전체 상태의 타입 설정