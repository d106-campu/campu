import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APISimpleResponse, ILikeRes } from "@/types/model";

export const postLikes = async (
  campsiteId: number
): Promise<APISimpleResponse<ILikeRes>> => {
  const res = await axiosAuthInstance.post(`/campsite/like/${campsiteId}`);
  return res.data
};
