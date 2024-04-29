interface IReviewItemProps {
  id: number;
  nickname: string;
  content: string;
  date: string;
}

const ReviewItem = ({ review }: { review: IReviewItemProps }) => {
  return (
    // @TODO: 이동 시 해당 리뷰 상세 페이지로 이동하기
    <div className="flex flex-col rounded-lg bg-SUB_GREEN_01 p-4 w-[33%] text-SUB_BLACK text-sm">
      <div className="line-clamp-3">{review.content}</div>
      <div className="pt-2 text-end mt-auto">
        <p className="font-bold text-end">{review.nickname}</p>
        <p className="text-xs text-[#919191]">{review.date}</p>
      </div>
    </div>
  );
};
export default ReviewItem;
