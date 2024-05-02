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

export interface IReview {
  id: number;
  nickname: string;
  profile: string;
  content: string;
  date: string;
  rating: number;
  images: string[];
}

export interface IReviewList {
  id: number;
  campsite_faclt_nm: string;
  rating: number;
  types: string[];
  totalReview: number;
  reviews: IReview[];
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