import { axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ICampsiteReq, ICampsiteRes } from "@/types/search";

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
  const res = await axiosCommonInstance.get("/campsite", {
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
