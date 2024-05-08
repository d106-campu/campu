export interface ILocationSimpleRes {
  mapX: number;
  mapY: number;
}

export interface ICampsiteSimpleRes {
  id: number;
  facltNm: string;
  lineIntro: string;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  addr2: string | null;
  thumbnailImageUrl: string;
  campsiteLocation: ILocationSimpleRes;
  like: boolean;
  available: boolean;
}

// 캠핑장 조회 Response (data.campsiteList.content)
export interface ICampsiteListRes {
  content: ICampsiteSimpleRes[];
}

export interface IPageableSimpleReq  {
  page : number;
  size: number;
}

// 캠핑장 조회 Request 
export interface ICampsiteReq {
  doNm ?: string;
  sigunguNm  ?: string;
  startDate : string;
  endDate : string;
  induty ?: string;
  theme ?: string;
  pageable : IPageableSimpleReq
}

// 더미데이터 Type
export interface ICampingGround {
  id: number;
  facltNm: string;
  lineIntro: string;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  addr2: string | null;
  price: number;
  rate: number;
  mapX: number;
  mapY: number;
  like: number;
  available: boolean;
  thumbnailImageUrl: string;
}
