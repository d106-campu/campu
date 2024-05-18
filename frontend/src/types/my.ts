// 마이페이지 사이드바 Tab
export type TabKey =
  | "reservations"
  | "reviews"
  | "favorites"
  | "alerts"
  | "profile";

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

// 내가 찜한 캠핑장 전체 응답
export interface IMyFavoritCampListResq {
  campsiteList: IMyFavoritCampListRes;
}

// 내가 찜한 캠핑장 요청
export interface IPageableSimpleReq {
  page: number;
  size: number;
}

// 내가 찜한 캠핑장 요청 pageable
export interface IPageableReq {
  pageable: IPageableSimpleReq;
}

// 내가 찜한 캠핑장 "좋아요 취소"
export interface ILike {
  like: boolean;
}

// "좋아요 취소" 응답
export interface ILikeRes {
  like: ILike;
}

// 캠핑장 정보 (식별번호, 이름, 주소, 사진URL)
export interface ICampsite {
  campsiteId: number;
  campsiteName: string;
  address: string;
  thumbnailImageUrl: string;
  tel?: string;
  checkin?: null | string;
  checkout?: null | string;
}

// 캠핑장 정보 내에 방 정보 (방 이름)
export interface IRoom {
  roomId: number;
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
  };
}

// 내 리뷰 요청
export interface IPageableMyReview {
  page: number;
  size: number;
}

// 내 리뷰 요청 pageable
export interface IPageableMyReivewReq {
  pageable: IPageableMyReview;
  dateType: "MONTH" | "MONTH6" | "YEAR" | "TOTAL";
}

// 내 리뷰에 대한 정보 응답
export interface IMyReviewRes {
  reviewId: number;
  score: number;
  content: string;
  createTime: string;
  imageUrl: string;
}

// 나의 예약 정보 응답
export interface IMyReservationRes {
  campsiteId: number;
  campsiteName: string;
  roomName: string;
}

// 리뷰와 예약 정보를 결합한 타입 응답
export interface IMyReivewMyReservationRes {
  review: IMyReviewRes;
  reservation: IMyReservationRes;
}

// 리뷰 목록 페이지 정보 응답
export interface IMyReviewContentRes {
  content: IMyReivewMyReservationRes[];
}

// 리뷰 목록 응답
export interface IMyReviewListRes {
  reviewList: IMyReviewContentRes;
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

// 내 예약예역 요청
export interface IPageableMyReservation {
  page: number;
  size: number;
}

// 내 예약내역 요청 pageable
export interface IPageableMyReservationReq {
  pageable: IPageableMyReservation;
  dateType: "MONTH" | "MONTH6" | "YEAR" | "TOTAL";
  useType: "BEFORE" | "AFTER";
}

// 내 예약내역 campsite 응답
export interface IMyReservationCampsite {
  campsiteId: number;
  campsiteName: string;
  address: string;
  thumbnailImageUrl: string;
  tel: string;
  checkin: string | null;
  checkout: string | null;
}

// 내 예약내역 room 응답
export interface IMyReservationRoom {
  roomId: number;
  induty: string;
  roomName: string;
  supplyList: string[];
}

// 내 예약내역 reservation 응답
export interface IMyReservationReservation {
  reservationId: number;
  impUid: string;
  headCnt: number;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
}

// 내 예약내역 campsiteLocation 응답
export interface IMyReservationCampsiteLocation {
  mapX: number;
  mapY: number;
}

// 캠핑장, 방, 예약, 지도위치 결합한 타입 응답
export interface IMyReservationAllRes {
  campsite: IMyReservationCampsite;
  room: IMyReservationRoom;
  reservation: IMyReservationReservation;
  campsiteLocation: IMyReservationCampsiteLocation;
}

// 모든 content 배열 응답
export interface IMyReservationContentRes {
  content: IMyReservationAllRes[];
}

// 예약내역 목록 응답
export interface IMyReservationListRes {
  reservationList: IMyReservationContentRes;
}
