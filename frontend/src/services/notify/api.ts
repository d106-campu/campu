import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { INotifyReq, INotifyListRes } from "@/types/notify";

export const getNotifyList = async (
  params: INotifyReq
): Promise<APIResponse<INotifyListRes>> => {
  const data = await axiosAuthInstance.get(`/notification/list`, {
    params: {
      size: params.size,
      page: params.page,
    },
  });
  return data.data;
};
