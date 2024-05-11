// 캠핑장 정보 (식별번호, 이름, 주소, 사진URL)
export interface ICampsite {
  campsiteId: number;
  campsiteName: string;
  address: string;
  thumbnailImageUrl: string;
}

// 캠핑장 정보 내에 방 정보 (방 이름)
export interface IRoom {
  roomName: string;
  campsite: ICampsite;
}

// 빈자리 알림 식별 (식별번호, 입실일, 퇴실일)
export interface IEmptyNotification {
  emptyNotificationId: number;
  startDate: string;
  endDate: string;
  room: IRoom;
}

// 빈자리알림 리스트 (결과값과 그 데이터)
export interface IEmptyNotificationList {
  result: string;
  data: {
    emptyNotificationList: IEmptyNotification[];
  }
}