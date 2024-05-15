import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { IOwnerCampsiteReq } from "@/types/owner";
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
