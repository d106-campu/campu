import { axiosAuthInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IBizrnoReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IOwnerReservationRes,
  IRoomCreateReq,
  IRoomCreateRes,
} from "@/types/owner";
import { ICampsiteRes } from "@/types/search";

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

// 캠핑장 방 등록
export const postCampsiteRoom = async (
  file: File,
  createRequestDto: IRoomCreateReq
): Promise<APIResponse<IRoomCreateRes>> => {
  console.log("사진 파일 :", file)
  console.log("보내는 것들 :", createRequestDto)
  
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
  console.log("폼데이터 길이 확인 :", formData.values.length)
  
  const res = await axiosFileInstance.post(`/owner/campsite/room`, formData);
  return res.data;

  // const res = await axiosAuthInstance.post(`/owner/campsite/room`, {
  //   file,
  //   createRequestDto
  // }, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // return res.data;
};
  
