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
