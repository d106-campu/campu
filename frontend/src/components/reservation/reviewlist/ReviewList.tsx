import ReviewItem from "@/components/review/ReviewItem";
import { IReview } from "@/types/review";

interface IReviewListProps {
  totalReview: number;
  reviews: IReview[];
}

const ReviewList = ({ totalReview, reviews }: IReviewListProps) => {
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
            <ReviewItem key={review.id} review={review} />
          ))}
      </div>
    </>
  );
};
export default ReviewList;
