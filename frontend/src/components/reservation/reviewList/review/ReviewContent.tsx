import Rating from "@/components/@common/Review/Rating";
import { formatSimpleReviewTime } from "@/utils/formatDateTime";

interface IReviewContentProps {
  content: string;
  date: string;
  rating: number;
}

const ReviewContent = ({ content, date, rating }: IReviewContentProps) => {
  const displayRating = rating.toFixed(1); // 소수점 한 자리로 표시

  return (
    <div className="ml-14 w-[800px] pb-14">
      <div className="flex justify-between items-end ml-2 py-3 text-[#A0A0A0] text-sm">
        <p>{formatSimpleReviewTime(date)} 방문</p>
        <div className="flex gap-2 items-end pr-2">
          <Rating rating={rating} size={25} gap="gap-[0.7px]" />
          <span>{displayRating}점</span>
        </div>
      </div>
      <div className="rounded-2xl object-cover object-center border p-5 text-BLACK whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};
export default ReviewContent;
