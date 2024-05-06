import Rating from "@/components/@common/Review/Rating";

interface IReviewContentProps {
  content: string;
  date: string;
  rating: number;
}

const ReviewContent = ({ content, date, rating }: IReviewContentProps) => {
  const displayRating = rating.toFixed(1); // 소수점 한 자리로 표시

  return (
    <div className="ml-14 w-[800px] text-lg pb-14">
      <div className="flex justify-between ml-2 py-3 text-UNIMPORTANT_TEXT_02">
        <p>{date} 방문</p>
        <div className="flex gap-2 pr-2">
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
