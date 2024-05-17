import { IReview } from "@/types/review";
import { formatSimpleReviewTime } from "@/utils/formatDateTime";

const SimpleReviewItem = ({ review }: { review: IReview }) => {
  return (
    <div className="flex flex-col rounded-lg bg-SUB_GREEN_01 p-4 w-[33%] text-SUB_BLACK text-sm">
      <div className="line-clamp-2 h-[30px] text-xs">{review.content}</div>
      <div className="pt-2 text-end mt-auto">
        <p className="font-bold text-end">{review.user.nickname}</p>
        <p className="text-xs text-[#919191]">
          {formatSimpleReviewTime(review.createTime)}
        </p>
      </div>
    </div>
  );
};
export default SimpleReviewItem;
