import { axiosAuthInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IBizrnoReq,
  ICampsiteMapRes,
  ICampsiteThumbnailRes,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IOwnerReservationRes,
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

// 사업자번호 등록
export const postBizrno = async (
  props: IBizrnoReq
): Promise<APIResponse<string>> => {
  const data = await axiosAuthInstance.post(`/owner/bizrno`, props);
  console.log("사업자번호 등록 성공:", data.data);
  return data.data;
};

// 캠핑장 예약 내역 조회
export const getOwnerReservationList = async ({
  campsiteId,
  date,
}: IOwnerReservationReq): Promise<APIResponse<IOwnerReservationRes>> => {
  const data = await axiosAuthInstance.get(
    `/owner/reservation/campsite/${campsiteId}`,
    {
      params: {
        date: date,
      },
    }
  );
  return data.data;
};

// 캠핑장 대표사진
export const updateThumnailImage = async (
  campsiteId: number,
  thumbnailImage: File
): Promise<APIResponse<ICampsiteThumbnailRes>> => {
  const formData = new FormData();
  formData.append("thumbnailImage", thumbnailImage);

  const data = await axiosFileInstance.post(
    `/image/campsite/${campsiteId}/thumbnail`,
    formData
  );
  return data.data;
};

// 캠핑장 배치도사진
export const updateMapImage = async (
  campsiteId: number,
  mapImage: File
): Promise<APIResponse<ICampsiteMapRes>> => {
  const formData = new FormData();
  formData.append("mapImage", mapImage);

  const data = await axiosFileInstance.post(
    `/image/campsite/${campsiteId}/map`,
    formData
  );
  return data.data;
};

// 캠핑장 일반추가사진
export const updateAddImage = async (
  campsiteId: number,
  generalImageList: File[]
): Promise<APIResponse<ICampsiteMapRes>> => {
  const formData = new FormData();
  generalImageList.forEach((image) => {
    formData.append(`generalImageList`, image);
  });
  const data = await axiosFileInstance.post(
    `/image/campsite/${campsiteId}/general`,
    formData
  );
  return data.data;
};
