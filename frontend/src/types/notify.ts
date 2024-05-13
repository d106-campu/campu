export interface INotifySInfo {
  notificationId: number;
  message: string;
  name: string;
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
  size: number;
  page: number;
}
