import { createSlice } from "@reduxjs/toolkit";

interface ICampsiteState {
  data: {
    id: number; // 캠핑장 아이디
    facltNm: string; // 캠핑장 이름
    tel: string; // 캠핑장 전화번호
    addr1: string; // 캠핑장 주소
    addr2: string; // 캠핑장 상세 주소
    mapX: number; // 위도
    mapY: number; // 경도
    score: number; // 별점
    checkIn: string; // 캠핑장 입실 시간
    checkOut: string; // 캠핑장 퇴실 시간}
  };
}

const initialState: ICampsiteState = {
  data: {
    id: 0,
    facltNm: "",
    tel: "",
    addr1: "",
    addr2: "",
    mapX: 36.1334375, // 위도
    mapY: 128.3710625, // 경도
    score: 0,
    checkIn: "",
    checkOut: "",
  },
};

const campsiteSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setCampsiteData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setCampsiteData } = campsiteSlice.actions;
export const campsiteReducer = campsiteSlice.reducer;
