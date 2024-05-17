import { axiosAuthInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IBizrnoReq,
  ICampsiteMapRes,
  ICampsiteThumbnailRes,
  IEditDetailReq,
  IEditDetailRes,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IOwnerReservationRes,
  IOwnerRoomListReq,
  IOwnerRoomListRes,
  IRoomCreateReq,
  IRoomCreateRes,
  IRoomDeleteReq,
  IRoomDeleteRes,
  IRoomUpdateReq,
  IRoomUpdateRes,
  IGeneralImageUpdateReq,
  IGeneralImageUpdateRes,
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

// 캠핑장 일반 사진 업데이트 수정
export const updateGeneralImages = async ({
  campsiteId,
  deleteImageList,
  insertImageList,
}: IGeneralImageUpdateReq): Promise<APIResponse<IGeneralImageUpdateRes>> => {
  const formData = new FormData();

  formData.append("deleteImageList", JSON.stringify(deleteImageList));

  // 추가할 이미지 리스트 각각 하나씩 추가
  insertImageList.forEach((image) => {
    if (image instanceof File) {
      formData.append("insertImageList", image);
    } else {
      console.error("추가이미지 오브젝트 생성 실패함 :", image);
    }
  });

  console.log("삭제한 이미지 확인 :", deleteImageList)
  console.log("추가한 이미지 확인 :", insertImageList)
  console.log("캠프사이트 Id :", campsiteId)

  // FormData의 모든 키-값 쌍을 출력
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const res = await axiosFileInstance.patch(
    `/image/campsite/${campsiteId}/general`,
    formData
  );
  
  return res.data;
};


// 캠핑장 방 정보 조회
export const getCampsiteRoomList = async ({
  campsiteId,
}: IOwnerRoomListReq): Promise<APIResponse<IOwnerRoomListRes>> => {
  const res = await axiosAuthInstance.get(`/owner/campsite/${campsiteId}`);
  return res.data;
};

// 캠핑장 방 등록
export const postCampsiteRoom = async (
  file: File,
  createRequestDto: IRoomCreateReq
): Promise<APIResponse<IRoomCreateRes>> => {
  const formData = new FormData();

  // 이미지 파일 추가
  if (file instanceof File) {
    formData.append("file", file);
  } else {
    console.error("이미지 파일 안들어감", file);
  }

  // createRequestDto 객체를 JSON 문자열로 변환하여 FormData에 추가
  const requestDtoBlob = new Blob([JSON.stringify(createRequestDto)], {
    type: "application/json",
  });
  formData.append("createRequestDto", requestDtoBlob);

  console.log("폼데이터 확인 :", formData);
  console.log("폼데이터 길이 확인 :", formData.values.length);

  const res = await axiosFileInstance.post(`/owner/campsite/room`, formData);
  return res.data;
};

// 캠핑장 방 수정
export const updateCampsiteRoom = async ({
  roomId,
  file,
  updateRequestDto,
}: IRoomUpdateReq): Promise<APIResponse<IRoomUpdateRes>> => {
  const formData = new FormData();

  // 이미지 파일 추가
  if (file instanceof File) {
    formData.append("file", file);
  }

  // updateRequestDto 객체를 JSON 문자열로 변환하여 FormData에 추가
  const requestDtoBlob = new Blob([JSON.stringify(updateRequestDto)], {
    type: "application/json",
  });
  formData.append("updateRequestDto", requestDtoBlob);

  const res = await axiosFileInstance.patch(
    `/owner/campsite/room/${roomId}`,
    formData
  );
  return res.data;
};

// 캠핑장 방 삭제
export const deleteCampsiteRoom = async ({
  roomId,
}: IRoomDeleteReq): Promise<APIResponse<IRoomDeleteRes>> => {
  const res = await axiosAuthInstance.delete(`/owner/campsite/room/${roomId}`);
  return res.data;
};

// 캠핑장 상세 수정
export const updateDatailCampsite = async (
  props: IEditDetailReq
): Promise<APIResponse<IEditDetailRes>> => {
  const data = await axiosAuthInstance.post(`/owner/campsite/detail`, props);
  return data.data;
};
