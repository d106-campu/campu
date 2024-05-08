import ReviewItem from "@/components/@common/Review/ReviewItem";
import { IReview } from "@/types/review";
import { useNavigate } from "react-router-dom";
import { PiNotePencilLight } from "react-icons/pi";
import { scrollToTop } from "@/utils/scrollToTop";

interface IReviewListProps {
  campsiteId: number;
  totalReview: number;
  reviews: IReview[];
}

const ReviewList = ({ campsiteId, totalReview, reviews }: IReviewListProps) => {
  const navigate = useNavigate();
  return (
    <>
      {/* 리뷰 */}
      <div className="flex justify-between">
        <h3 className="font-bold text-xl p-2">
          방문자 리뷰
          <span className="text-MAIN_GREEN pl-2">{totalReview}</span>
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
        {reviews &&
          reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => {
                navigate(`/camps/${campsiteId}/reviews/${review.id}`);
                scrollToTop();
              }}
            >
              <ReviewItem review={review} />
            </div>
          ))}
      </div>
    </>
  );
};
export default ReviewList;
