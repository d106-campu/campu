import { axiosCommonInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { IReviewListRes, ICampScoreRes } from "@/types/review";

// 리뷰 목록 조회
export const getReviewList = async (
  campsiteId: number
): Promise<APIResponse<IReviewListRes>> => {
  const res = await axiosCommonInstance.get(`/review/campsite/${campsiteId}`);
  return res.data;
};

// 캠핑장 평점 조회
export const getCampScore = async (
  campsiteId: number
): Promise<APIResponse<ICampScoreRes>> => {
  const res = await axiosCommonInstance.get(
    `/review/campsite/score/${campsiteId}`
  );
  return res.data;
};
