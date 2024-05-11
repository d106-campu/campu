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


// 내가 찜한 캠핑장 응답 content (배열)
export interface IMyFavoritCampListRes {
  content: IMyFavoritCampRes[];
}

export interface IPageableSimpleReq {
  page: number;
  size: number;
}

export interface IPageableReq {
  pageable: IPageableSimpleReq
}