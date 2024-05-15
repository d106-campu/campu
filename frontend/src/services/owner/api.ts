import { axiosAuthInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  ICampsiteMapReq,
  ICampsiteMapRes,
  ICampsiteThumbnailReq,
  ICampsiteThumbnailRes,
  IOwnerCampsiteReq,
} from "@/types/owner";
import { ICampsiteRes } from "@/types/search";

// 사장님 캠핑장 리스트 조회
export const getOwnerCampsiteList = async ({
  pageable,
}: IOwnerCampsiteReq): Promise<APIResponse<ICampsiteRes>> => {
  const data = await axiosAuthInstance.get(`/owner/campsite`, {
    params: {
      ...pageable,
    },
  });
  return data.data;
};

// 캠핑장 대표 이미지 업로드
export const postThumbnailImage = async ({
  campsiteId,
  thumbnailImage,
}: ICampsiteThumbnailReq): Promise<APIResponse<ICampsiteThumbnailRes>> => {
  const formData = new FormData();
  formData.append("thumbnailImage", thumbnailImage);
  const data = await axiosFileInstance.post(
    `/image/campsite/${campsiteId}/thumbnail`,
    formData
  );
  return data.data;
};

// 캠핑장 대표 배치도 업로드
export const postMapImage = async ({
  campsiteId,
  mapImage,
}: ICampsiteMapReq): Promise<APIResponse<ICampsiteMapRes>> => {
  const formData = new FormData();
  formData.append("mapImage", mapImage);
  const data = await axiosFileInstance.post(
    `/image/campsite/${campsiteId}/map`,
    formData
  );
  return data.data;
};