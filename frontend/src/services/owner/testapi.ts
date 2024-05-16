// owner/api.ts로 옮긴 후에 지워주세용~

import { axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IRoomCreateReq,
  IRoomCreateRes,
} from "@/types/testOwner";

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
  console.log("폼데이터 길이 확인 :", formData.values.length)
  
  const res = await axiosFileInstance.post(`/owner/campsite/room`, formData);
  return res.data;
};