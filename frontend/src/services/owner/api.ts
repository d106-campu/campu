import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IBizrnoReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IOwnerReservationRes,
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
