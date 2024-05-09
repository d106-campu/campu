import { axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ICampsiteListRes, ICampsiteReq } from "@/types/search";

export const getCampsiteReq = async ({
  doNm,
  sigunguNm,
  startDate,
  endDate,
  induty,
  theme,
}: ICampsiteReq): Promise<APIResponse<ICampsiteListRes>> => {
  const { data } = await axiosCommonInstance.get("/campsite", {
    params: {
      doNm: doNm,
      sigunguNm: sigunguNm,
      startDate: startDate,
      endDate: endDate,
      induty: induty,
      theme: theme,
    },
  });
  return data;
};
