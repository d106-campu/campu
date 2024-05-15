import { IPageableSimpleReq } from "./model";

// 전체 알림 조회 Request
export interface IOwnerCampsiteReq {
  pageable: IPageableSimpleReq;
}

// 캠핑장 대표사진 Requset
export interface ICampsiteThumbnailReq {
  campsiteId: number;
  thumbnailImage: File;
}

// 캠핑장 대표사진 Response
export interface ICampsiteThumbnailRes {
  thumbnailImage: string;
}

// 캠핑장 배치도사진 Request
export interface ICampsiteMapReq {
  campsiteId: number;
  mapImage: string;
}

// 캠핑장 배치도사진 Response
export interface ICampsiteMapRes {
  mapImage: string;
}

// 캠핑장 일반 사진 Request
export interface ICampsiteImageReq {
  campsiteId: number;
  generalImageList : string[];
}

// 캠핑장 일반사진 Response
export interface ICampsiteImageRes {
  generalImageList: string[];
}