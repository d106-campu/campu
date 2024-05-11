// 마이페이지 사이드바 Tab
export type TabKey =
'reservations' | 'reviews' | 'favorites' | 'alerts' | 'profile';

// 내가 찜한 캠핑장 응답
export interface IMyFavoritCampRes {
  campsiteId: number;
  campsiteName: string;
  thumbnailImageUrl: string;
  lineIntro: string;
  address: string;
  minPrice: number;
  score: number;
}

// 내가 찜한 캠핑장 응답 content
export interface IMyFavoritCampListRes {
  content: IMyFavoritCampRes[];
}

// 내가 찜한 캠핑장 요청
export interface IPageableSimpleReq {
  page: number;
  size: number;
}
// 내가 찜한 캠핑장 요청 pageable
export interface IPageableReq {
  pageable: IPageableSimpleReq
}

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

// 내 예약내역 -> api 연결시 수정
export interface IDetailProps {
  titleLeft: string;
  contentLeft: string;
  titleRight: string;
  contentRight: string;
}

// 내 예약내역 -> api 연결시 수정
export interface IReservationProps {
  campName: string;
  area: string;
  date: string;
  nights: number;
  details: IDetailProps[];
  people: number;
  camInduty: string;
  price: number;
  address: string;
}