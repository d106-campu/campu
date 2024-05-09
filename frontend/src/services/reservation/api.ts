import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ILikeRes } from "@/types/reservation";

export const postLikes = async (
  campsiteId: number
): Promise<APIResponse<ILikeRes>> => {
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  return res.data;
};
