import { IPageableSimpleReq } from "./model";

// 전체 알림 조회 Request
export interface IOwnerCampsiteReq {
  pageable: IPageableSimpleReq;
}

// 사업자번호 등록 Request
export interface IBizrnoReq {
  bizrno: string;
}

