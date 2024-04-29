// 더미
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserLoginState {
  isLogin: boolean;
}

const initialState: IUserLoginState = {
  isLogin : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLogin } = authSlice.actions;
export const authReducer  = authSlice.reducer;
