import { axiosAuthInstance, axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ICampsiteReq, ICampsiteRes } from "@/types/search";

// 로그인 상태 확인 함수
const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

export const getCampsiteReq = async ({
  doNm,
  sigunguNm,
  startDate,
  endDate,
  headCnt,
  induty,
  theme,
  pageable,
}: ICampsiteReq): Promise<APIResponse<ICampsiteRes>> => {
  const axiosInstance = isUserLoggedIn()
    ? axiosAuthInstance
    : axiosCommonInstance;
  const res = await axiosInstance.get("/campsite", {
    params: {
      doNm: doNm,
      sigunguNm: sigunguNm,
      startDate: startDate,
      endDate: endDate,
      headCnt: headCnt,
      induty: induty,
      theme: theme,
      ...pageable,
    },
  });
  return res.data;
};
