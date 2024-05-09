import { createSlice } from "@reduxjs/toolkit";

interface IReservationState {
  data: {
    reservationId: number; // 예약 아이디
    image: string; // 방 사진
    campsite_faclt_nm: string; // 캠핑장 이름
    campsite_tel: string; // 캠핑장 전화번호
    campsite_addr1: string; // 캠핑장 주소
    campsite_addr2: string; // 캠핑장 상세 주소
    mapX: number; // 위도
    mapY: number; // 경도
    rating: number; // 별점
    roomName: string; // 캠핑장 방 이름
    roomInduty: string; // 캠핑 유형
    supplyList: string[];
    headCnt: number; // 예약 인원
    price: number; // 총 가격
    startDate: string; // 캠핑 시작일
    endDate: string; // 캠핑 종료일
    checkIn: string; // 캠핑장 입실 시간
    checkOut: string; // 캠핑장 퇴실 시간
  };
  status: "proceeding" | "complete";
}

const initialState: IReservationState = {
  data: {
    reservationId: 0,
    image: "",
    campsite_faclt_nm: "",
    campsite_tel: "",
    campsite_addr1: "",
    campsite_addr2: "",
    mapX: 36.1071305028147,
    mapY: 128.4169500162442,
    rating: 0,
    roomName: "",
    roomInduty: "",
    supplyList: [],
    headCnt: 1,
    price: 0,
    startDate: "",
    endDate: "",
    checkIn: "",
    checkOut: "",
  },
  status: "proceeding",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    setReservationData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setReservationData, updateStatus } = reservationSlice.actions;

export const reservationReducer = reservationSlice.reducer;
