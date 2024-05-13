import ReviewItem from "@/components/@common/Review/ReviewItem";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "@/utils/scrollToTop";
import { useReview } from "@/hooks/review/useReview";
import useIntersectionObserver from "@/hooks/@common/useIntersectionObserver";
import Lottie from "react-lottie";
import {
  caravanOptions,
  roomsLoadingOptions,
} from "@/assets/lotties/lottieOptions";

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
    isLoading,
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
      </div>
      <div className="flex flex-wrap justify-start gap-5 my-2 pb-10 h-[calc(100vh-22rem)]">
        {/* 로딩중 UI */}
        {isLoading && (
          <>
            <div className="pt-10 text-center mx-auto">
              <p className="text-MAIN_GREEN text-lg font-semibold">로딩 중</p>
              <p className="text-sm text-SUB_BLACK">잠시만 기다려 주세요</p>
              <Lottie options={roomsLoadingOptions} height={90} width={200} />
            </div>
          </>
        )}
        {reviewListData?.pages &&
        reviewListData.pages.some(
          (page) => page.data.reviewList.content.length > 0
        ) ? (
          reviewListData.pages.map((item) =>
            item.data.reviewList.content.map((review) => (
              <>
                {/* ReviewItem 렌더링 */}
                <div
                  key={review.id}
                  onClick={() => {
                    navigate(`/camps/${campsiteId}/reviews/${review.id}`);
                    scrollToTop();
                  }}
                >
                  <ReviewItem review={review} />
                </div>
              </>
            ))
          )
        ) : (
          <div className="mx-auto">
            {/* 리뷰가 없을 때 UI */}
            <div className="text-center p-5">
              <p className="text-lg text-MAIN_GREEN font-semibold">
                아직 작성된 리뷰가 없어요 😥
              </p>
              <p className="text-sm text-SUB_BLACK">
                캠핑장을 방문하고 첫 리뷰의 주인공이 되어보세요!
              </p>
            </div>
            <div className="w-[1000px] overflow-hidden rounded-2xl">
              <Lottie
                options={caravanOptions}
                height={380}
                width={1000}
                speed={0.4}
              />
            </div>
          </div>
        )}
        {/* 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
        <div ref={setTarget} className="h-[1rem]" />
      </div>
    </>
  );
};
export default ReviewList;
