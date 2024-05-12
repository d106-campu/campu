import { getReviewList, getCampScore } from "@/services/review/api";
import { IReviewListReq } from "@/types/review";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useReview = () => {
  // 캠핑장 평점 조회 (무한 스크롤)
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

  // 리뷰 목록 조회
  const useGetCampScore = (campsiteId: number) => {
    return useQuery({
      queryKey: ["campsite", campsiteId],
      queryFn: () => getCampScore(campsiteId),
    });
  };

  return { useGetReviewListInfinite, useGetCampScore };
};
