import { IPageableSimpleReq } from "./model";

// 전체 알림 조회 Request
export interface IOwnerCampsiteReq {
  pageable: IPageableSimpleReq;
}

// 사업자번호 등록 Request
export interface IBizrnoReq {
  bizrno: string;
}

// 예약내역 Request
export interface IOwnerReservationReq {
  campsiteId: number;
  date?: string;
}

export interface IRoomInfo {
  id: number;
  name: string;
}

export interface IcustomerInfo {
  nickname: string;
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
export interface ICampsiteAddReq {
  campsiteId: number;
  generalImageList: string[];
}

// 캠핑장 일반사진 Response
export interface ICampsiteAddRes {
  generalImageList: string[];
}
