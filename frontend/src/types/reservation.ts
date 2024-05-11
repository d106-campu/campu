import { IPageable, ISort } from "./model";

// 좋아요
export interface ILike {
  like: boolean;
}

export interface ILikeRes {
  likeResponse: ILike;
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

// 방 목록
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

// 빈자리 알림 등록
export interface IAlertReq {
  roomId: number;
  startDate: string;
  endDate: string;
}
