import { IPageable, ISort } from "./model";

export interface ISimpleReview {
  id: number;
  nickname: string;
  content: string;
  date: string;
}

export interface ISimpleReviewList {
  totalReview: number;
  reviews: ISimpleReview[];
}

// 사용자 정보 타입
export interface IUser {
  nickname: string;
  profileImageUrl: string;
}

// 리뷰 정보 타입
export interface IReview {
  id: number;
  createTime: string;
  user: IUser;
  score: number;
  content: string;
  reviewImageList: string[];
}

// 페이지에 대한 리뷰 목록 타입
export interface IReviewList {
  content: IReview[];
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
}

// 리뷰 목록 조회 Response
export interface IReviewListRes {
  reviewList: IReviewList;
}

// 캠핑장 평점 조회 Response
export interface ICampScoreRes {
  campsiteScore: number;
}

export interface IMyReview {
  campsiteName: string;
  content: string;
  area: string;
  date: string;
  rating: number;
  images: string[];
}

export interface IMyReviewList {
  totalMyReview: number;
  reviews: IMyReview[];
}
