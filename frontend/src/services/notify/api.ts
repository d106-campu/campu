import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { INotifyListRes, INotifyReq } from "@/types/notify";

export const getNotifyList = async ({
  pageable,
}: INotifyReq): Promise<APIResponse<INotifyListRes>> => {
  const data = await axiosAuthInstance.get(`/notification/list`, {
    params: {
      ...pageable,
    },
  });
  return data.data;
};
