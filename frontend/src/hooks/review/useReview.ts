import { getReviewList } from "@/services/review/api";
import { IReviewListReq } from "@/types/review";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReview = () => {
  // 캠핑장 평점 조회 (무한 스크롤)
  const useGetReviewList = (props: IReviewListReq) => {
    return useInfiniteQuery({
      queryKey: ["reviews", props.campsiteId, props.size],
      queryFn: ({ pageParam }) => getReviewList({ ...props, page: pageParam }),
      initialPageParam: 0, // 페이지는 0부터 시작하도록 설정
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지면 더 이상 페이지를 요청하지 않음
        if (lastPage.data.reviewList.last) return undefined; // 쿼리를 더 이상 진행하지 않음

        // 다음 페이지 번호 계산
        return allPages.length + 1;
      },
    });
  };
  // 리뷰 목록 조회

  return { useGetReviewList };
};
