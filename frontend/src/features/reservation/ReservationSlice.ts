import { createSlice } from "@reduxjs/toolkit";

interface IReservationState {
  data: {
    impUid: string;
    reservationId: number; // 예약 아이디
    image: string | null; // 방 사진
    facltNm: string; // 캠핑장 이름
    tel: string; // 캠핑장 전화번호
    addr1: string; // 캠핑장 주소
    addr2: string; // 캠핑장 상세 주소
    mapX: number; // 위도
    mapY: number; // 경도
    score: number; // 별점
    campsiteId: number; // 캠핑장 아이디
    roomId: number; // 예약 방 아이디
    roomName: string; // 캠핑장 방 이름
    roomInduty: string; // 캠핑 유형
    supplyList: string[] | null;
    headCnt: number; // 예약 인원
    totalPrice: number; // 총 가격
    startDate: string; // 캠핑 시작일
    endDate: string; // 캠핑 종료일
    checkIn: string; // 캠핑장 입실 시간
    checkOut: string; // 캠핑장 퇴실 시간
  };
  status: "proceeding" | "complete";
}

const initialState: IReservationState = {
  data: {
    impUid: "",
    reservationId: 0,
    image: "",
    facltNm: "",
    tel: "",
    addr1: "",
    addr2: "",
    mapX: 36.1071305028147,
    mapY: 128.4169500162442,
    score: 0,
    campsiteId: 0,
    roomId: 0,
    roomName: "",
    roomInduty: "",
    supplyList: [],
    headCnt: 1,
    totalPrice: 0,
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
    resetReservationData: (state) => {
      state.data = initialState.data;
      state.status = initialState.status;
    },
  },
});

export const { setReservationData, updateStatus, resetReservationData } =
  reservationSlice.actions;

export const reservationReducer = reservationSlice.reducer;
