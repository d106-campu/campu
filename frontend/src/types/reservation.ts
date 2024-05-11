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
  image_url: string;
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
