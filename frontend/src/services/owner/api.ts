import { axiosAuthInstance, axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { IOwnerCampsiteReq } from "@/types/owner";
import { ICampsiteRes } from "@/types/search";

// 로그인 상태 확인 함수
const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

export const getOwnerCampsiteList = async ({
  pageable,
}: IOwnerCampsiteReq): Promise<APIResponse<ICampsiteRes>> => {
  const axiosInstance = isUserLoggedIn()
    ? axiosAuthInstance
    : axiosCommonInstance;
  const data = await axiosInstance.get(`/campsite/owner`, {
    params: {
      ...pageable,
    },
  });
  return data.data;
};
