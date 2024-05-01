import ReviewItem from "@/components/review/ReviewItem";
import { IReview } from "@/types/review";
import { useNavigate } from "react-router-dom";

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
      <h3 className="font-bold text-xl py-2">
        방문자 리뷰
        <span className="text-MAIN_GREEN pl-2">{totalReview}</span>
      </h3>
      <div className="flex flex-wrap justify-start gap-5 ml-[20px] my-2 pb-10">
        {reviews &&
          reviews.map((review) => (
            <div
              key={review.id}
              onClick={() =>
                navigate(`/camps/${campsiteId}/reviews/${review.id}`)
              }
            >
              <ReviewItem review={review} />
            </div>
          ))}
      </div>
    </>
  );
};
export default ReviewList;
