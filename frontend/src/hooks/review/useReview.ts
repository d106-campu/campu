import { getReviewList, getCampScore, postReview } from "@/services/review/api";
import { IReviewListReq } from "@/types/review";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useReview = () => {
  // 리뷰 목록 조회 (무한 스크롤)
  const useGetReviewListInfinite = (props: IReviewListReq) => {
    return useInfiniteQuery({
      queryKey: ["reviews", props.campsiteId, props.size],
      queryFn: ({ pageParam }) => getReviewList({ ...props, page: pageParam }),
      initialPageParam: 0, // 페이지는 0부터 시작하도록 설정
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.reviewList.last) return undefined;
        return allPages.length + 1;
      },
    });
  };

  // 리뷰 목록 조회 (예약 페이지에서 필요)
  const useGetReviewList = (props: IReviewListReq) => {
    return useQuery({
      queryKey: ["reviews", props.campsiteId],
      queryFn: () => getReviewList(props),
    });
  };

  // 캠핑장 평점 조회
  const useGetCampScore = (campsiteId: number) => {
    return useQuery({
      queryKey: ["campsite", campsiteId],
      queryFn: () => getCampScore(campsiteId),
    });
  };

  // 리뷰 등록
  const usePostReview = () => {
    return useMutation({
      mutationKey: ["user review"],
      mutationFn: postReview,
      onSuccess: (res) => {
        console.log("리뷰 등록 성공", res);
      },
      onError: (err) => {
        console.error("리뷰 등록 실패", err);
      },
    });
  };

  return {
    useGetReviewListInfinite,
    useGetReviewList,
    useGetCampScore,
    usePostReview,
  };
};
