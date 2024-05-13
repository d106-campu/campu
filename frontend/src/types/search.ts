export interface IMapInfo {
  mapX: number;
  mapY: number;
}

// 지도 중심 좌표 ( 지역 기준 )
export interface IMapCoordinates {
  center: IMapInfo;
}

export interface ICampsiteSimpleRes {
  id: number;
  facltNm: string;
  lineIntro: string | null;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  addr2: string | null;
  thumbnailImageUrl: string;
  campsiteLocation: IMapInfo;
  like: boolean;
  available: boolean;
  price: number;
  score: number;
}

export interface ICampsiteListRes {
  content: ICampsiteSimpleRes[];
}

// 캠핑장 조회 Response
export interface ICampsiteRes {
  mapCoordinates: IMapCoordinates;
  campsiteList: ICampsiteListRes;
}

export interface IPageableSimpleReq {
  page: number;
  size: number;
}

// 캠핑장 조회 Request
export interface ICampsiteReq {
  doNm?: string | null;
  sigunguNm?: string | null;
  startDate: string;
  endDate: string;
  headCnt: number;
  induty?: string;
  theme?: string;
  pageable: IPageableSimpleReq;
}

