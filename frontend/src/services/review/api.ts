import { axiosAuthInstance, axiosCommonInstance, axiosFileInstance } from "@/apis/axiosInstance";
import { APIResponse, APISimpleResponse } from "@/types/model";
import {
  IReviewListRes,
  ICampScoreRes,
  IReviewListReq,
  IPostReviewReq,
  IReviewRes,
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
    if (file instanceof File) {
      formData.append("files", file);
    } else {
      console.error("Invalid file object:", file);
    }
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

  // // FormData의 모든 키-값 쌍을 출력
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  // console.log("formData :", formData, formData.values.length);
  const res = await axiosFileInstance.post(`/review`, formData);
  return res.data;
};

// 리뷰 상세 조회
export const getReview = async (
  reviewId: number
): Promise<APIResponse<IReviewRes>> => {
  const res = await axiosCommonInstance.get(
    `/review/campsite/${reviewId}/detail`
  );
  return res.data;
};

// 내 리뷰 삭제 
export const deleteReview = async (
  reviewId: number
): Promise<APISimpleResponse> => {
  const response = await axiosAuthInstance.delete<APISimpleResponse>(
    `/review/${reviewId}`
  );
  return response.data;
};
