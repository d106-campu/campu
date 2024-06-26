import { IPageableSimpleReq } from "./model";

// 전체 알림 조회 Request
export interface IOwnerCampsiteReq {
  pageable: IPageableSimpleReq;
}

// 사업자번호 등록 Request
export interface IBizrnoReq {
  bizrno: string;
}

export interface IBizrnoRes {
  result: string;
}

// 예약내역 Request
export interface IOwnerReservationReq {
  campsiteId: number;
  date?: string;
}

export interface IRoomInfo {
  id: number;
  name: string;
  imageUrl?: string | null;
}

export interface IcustomerInfo {
  nickName: string;
  tel: string;
}
export interface IReservationSimpleRes {
  id: number;
  room: IRoomInfo;
  customer: IcustomerInfo;
  headCnt: number;
  startDate: string;
  endDate: string;
  status: string;
}

// 예약내역 Response
export interface IOwnerReservationRes {
  reservationList: IReservationSimpleRes[];
}

// 캠핑장 대표사진 수정 Request
export interface ICampsiteThumbnailReq {
  campsiteId: number;
  thumbnailImage: string;
}

// 캠핑장 대표사진 Response
export interface ICampsiteThumbnailRes {
  thumbnailImage: string;
}

// 캠핑장 배치도 수정 Request
export interface ICampsiteMapReq {
  campsiteId: number;
  mapImage: string;
}

// 캠핑장 배치도 Response
export interface ICampsiteMapRes {
  mapImage: string;
}

// 캠핑장 일반사진 수정 Request
export interface IGeneralImageUpdateReq {
  campsiteId: number;
  deleteImageList: { imageIdList: number[] };
  insertImageList: File[];
}

// 캠핑장 일반사진 수정 Response
export interface IGeneralImageUpdateRes {
  generalImageList: string[];
}

// 캠핑장 방 목록 조회
export interface IOwnerRoomListReq {
  campsiteId: number;
}

// 캠핑장 방 목록 응답 목록
export interface IOwnerRoomList {
  roomId: number;
  imageUrl: string;
  induty: string;
  roomName: string;
  baseNo: number;
  maxNo: number;
  price: number;
  extraPrice: number;
  toilet: boolean;
}

// 캠핑장 방 목록 응답
export interface IOwnerRoomListRes {
  roomList: IOwnerRoomList[];
}

// 캠핑장 방 등록 요청
export interface IRoomCreateReq {
  campsiteId: number;
  induty: string;
  roomName: string;
  price: number;
  baseNo: number;
  maxNo: number;
  extraPrice: number;
  toilet: boolean;
}

// 캠핑장 방 등록 응답
export interface IRoomCreateRes {
  result: string;
}

// 캠핑장 방 수정 요청
export interface IRoomUpdateReq {
  roomId: number;
  file?: File;
  updateRequestDto: {
    induty: string;
    roomName: string;
    price: number;
    baseNo: number;
    maxNo: number;
    extraPrice: number;
    toilet: boolean;
  };
}

// 캠핑장 방 수정 응답
export interface IRoomUpdateRes {
  result: string;
}

// 캠핑장 방 삭제 요청
export interface IRoomDeleteReq {
  roomId: number;
}

// 캠핑장 방 삭제 응답
export interface IRoomDeleteRes {
  result: string;
}

// 캠핑장 정보 수정 Request
export interface IEditDetailReq {
  campsiteId: number;
  intro: string;
  themeList: string[];
  fcltyList: string[];
}

// 캠핑장 정보 수정 Response
export interface IEditDetailRes {
  result: string;
}
