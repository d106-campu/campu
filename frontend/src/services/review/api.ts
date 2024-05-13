import { axiosCommonInstance, axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse, APISimpleResponse } from "@/types/model";
import {
  IReviewListRes,
  ICampScoreRes,
  IReviewListReq,
  IPostReviewReq,
} from "@/types/review";

// 리뷰 목록 조회
export const getReviewList = async (
  params: IReviewListReq
): Promise<APIResponse<IReviewListRes>> => {
  const res = await axiosCommonInstance.get(
    `/review/campsite/${params.campsiteId}`,
    {
      params: {
        size: params.size,
        page: params.page, // 페이지 정보 추가
      },
    }
  );
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

// 리뷰 등록
export const postReview = async ({
  reservationId,
  content,
  score,
}: IPostReviewReq): Promise<APISimpleResponse> => {
  const res = await axiosAuthInstance.post(`/review`, {
    reservationId: reservationId,
    content: content,
    score: score,
  });
  return res.data;
};