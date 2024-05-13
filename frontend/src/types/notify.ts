import { IPageableSimpleReq } from "./model";

export interface INotifySInfo {
  notificationId: number;
  message: string;
  name: string;
  date: string;
  no: string;
  url: string;
  createTime: string;
}

export interface INotifySimpleRes {
  content: INotifySInfo[];
}

// 전체 알림 조회 Response
export interface INotifyListRes {
  notificationList: INotifySimpleRes;
}

// 전체 알림 조회 Request
export interface INotifyReq {
  pageable: IPageableSimpleReq;
}

// 알림 삭제 Request
export interface INotifyDeleteReq {
  notificationId: number;
}
