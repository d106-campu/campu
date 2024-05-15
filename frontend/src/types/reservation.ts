import { IPageable, ISort } from "./model";

// 좋아요
export interface ILike {
  like: boolean;
}

export interface ILikeRes {
  like: ILike;
  // likeResponse: ILike;
}

// 방 목록 아이템
export interface IRoomItem {
  id: number;
  induty: string;
  name: string;
  baseNo: number;
  maxNo: number;
  price: number;
  extraPrice: number;
  roomCnt: number;
  toiletCnt: number;
  supplyList: string[] | null;
  available: boolean;
  imageUrl: string | null;
  emptyNotification: boolean;
}

// 방 목록 조회 Response
export interface IRoomListRes {
  roomList: {
    content: IRoomItem[];
    pageable: IPageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: ISort;
    numberOfElements: number;
    empty: boolean;
  };
}

// 방 목록 조회 Request
export interface IRoomListReq {
  campsiteId: number;
  size: number;
  headCnt: number;
  startDate: string;
  endDate: string;
}

// 빈자리 알림 등록 Request
export interface IAlertPostReq {
  roomId: number;
  startDate: string;
  endDate: string;
}

// 캠핑장 상세 조회 Response
export interface ICampsiteRes {
  campsite: ICampsite;
}

// 캠핑장 상세 정보
export interface ICampsite {
  id: number;
  owner: ICampsiteOwner;
  facltNm: string; // 캠핑장명
  tel: string; // 캠핑장 연락처
  lineIntro: string; // 한 줄 소개
  intro: string; // 긴 글 소개
  allar: number; // 전체 면적
  bizrno: string; // 사업자 등록 번호
  trsagntNo: string; // 관광 사업자 등록 번호
  doNm: string; // 도
  sigunguNm: string; // 시군구
  addr1: string; // 주소
  addr2: string | null; // 상세 주소
  indutyList: string[]; // 캠핑장 유형
  themeList: string[]; // 캠핑장 테마
  facltList: string[]; // 시설
  score: number; // 별점
  campsiteLocation: ICampsiteLocation; // 캠핑장 위치
  sitedStnc: number; // 사이트간 거리
  animalCmgCl: string; // 애완동물출입
  hit: number; // 조회수
  like: boolean; // 좋아요 여부
  homepage: string | null; // 홈페이지 주소
  thumbnailImageUrl: string; // 썸네일 이미지
  mapImageUrl: string | null; // 배치도 이미지
  campsiteImageUrlList: string[]; // 캠핑장 메인 이미지
  checkin: string | null; // 체크인 시간
  checkout: string | null; // 체크아웃 시간
}

// 캠핑장 위치 정보
export interface ICampsiteLocation {
  mapX: number; // 위도
  mapY: number; // 경도
}

// 캠핑장 소유자 정보
export interface ICampsiteOwner {
  nickName: string; // 사장님
  tel: string; // 사장님 연락처
}
