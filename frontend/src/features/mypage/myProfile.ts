import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import profileDefaultImage from "@/assets/images/profile.png";

interface IProfileImageState {
  isProfileImage: string;
}

const initialState: IProfileImageState = {
  isProfileImage : profileDefaultImage,
};

const profileImageSlice = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    setIsProfileImage: (state, action: PayloadAction<string>) => {
      state.isProfileImage = action.payload;
    },
  },
});

export const { setIsProfileImage } = profileImageSlice.actions;
export const profileImageReducer  = profileImageSlice.reducer;
