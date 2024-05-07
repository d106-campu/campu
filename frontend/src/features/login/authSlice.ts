// 더미
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserLoginState {
  isLogin: boolean;
  nickname: string;
}

const initialState: IUserLoginState = {
  isLogin : false,
  nickname: "닉네임이 없습니다."
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { setIsLogin, setNickname } = authSlice.actions;
export const authReducer  = authSlice.reducer;
