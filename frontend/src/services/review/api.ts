import { axiosCommonInstance, axiosFileInstance } from "@/apis/axiosInstance";
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
  files,
}: IPostReviewReq): Promise<APISimpleResponse> => {
  const formData = new FormData();

  // files 배열의 각 항목을 FormData에 추가
  files.forEach((file) => {
    formData.append("files", file);
    console.log("api - file", file);
  });

  // createRequestDto 객체를 JSON 문자열로 변환하여 FormData에 추가
  const createRequestDto = {
    reservationId,
    content,
    score,
  };

  const review = new Blob([JSON.stringify(createRequestDto)], {
    type: "application/json",
  });

  formData.append("createRequestDto", review);

  console.log("formData :", formData, formData.values.length);
  const res = await axiosFileInstance.post(`/review`, formData);
  return res.data;
};
