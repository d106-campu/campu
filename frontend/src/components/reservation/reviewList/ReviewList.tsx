import ReviewItem from "@/components/@common/Review/ReviewItem";
import { useNavigate } from "react-router-dom";
import { PiNotePencilLight } from "react-icons/pi";
import { scrollToTop } from "@/utils/scrollToTop";
import { useReview } from "@/hooks/review/useReview";
import useIntersectionObserver from "@/hooks/@common/useIntersectionObserver";

interface IReviewListProps {
  campsiteId: number;
}

const ReviewList = ({ campsiteId }: IReviewListProps) => {
  const { useGetReviewListInfinite } = useReview();
  const navigate = useNavigate();

  // 캠핑장 리뷰 목록 조회 (무한스크롤)
  const {
    data: reviewListData,
    fetchNextPage,
    hasNextPage,
    // isLoading,
  } = useGetReviewListInfinite({ campsiteId, size: 8 });

  // 무한스크롤 감지
  const { setTarget } = useIntersectionObserver({ fetchNextPage, hasNextPage });

  const totalElements =
    reviewListData?.pages[0]?.data.reviewList.totalElements || 0;
  return (
    <>
      {/* 리뷰 */}
      <div className="flex justify-between">
        <h3 className="font-bold text-xl p-2">
          방문자 리뷰
          <span className="text-MAIN_GREEN pl-2">{totalElements}</span>
        </h3>
        {/* @TODO: 예약내역이 있을 경우에만 보이도록 */}
        <button
          onClick={() => {
            navigate(`/camps/${campsiteId}/reviews/write`);
            scrollToTop();
          }}
          className="flex items-end gap-1 text-sm"
        >
          리뷰 작성하기
          <PiNotePencilLight
            size={25}
            className="hover:bg-SUB_GREEN_01 hover:text-MAIN_GREE"
          />
        </button>
      </div>
      <div className="flex flex-wrap justify-start gap-5 my-2 pb-10">
        {reviewListData?.pages &&
          reviewListData.pages.map((item) =>
            item.data.reviewList.content.map((review) => (
              <div
                key={review.id}
                onClick={() => {
                  navigate(`/camps/${campsiteId}/reviews/${review.id}`);
                  scrollToTop();
                }}
              >
                <ReviewItem review={review} />
              </div>
            ))
          )}
        {/* 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
        <div ref={setTarget} className="h-[1rem]" />
      </div>
    </>
  );
};
export default ReviewList;
