import profile from "@/assets/images/profile.png"; // 기본 프로필
import Lottie from "react-lottie";
import { noImageOptions } from "@/assets/lotties/lottieOptions";
import Rating from "@/components/@common/Review/Rating";
import { IReview } from "@/types/review";
import { useState } from "react";
import { formatSimpleReviewTime } from "@/utils/formatDateTime";

const ReviewItem = ({ review }: { review: IReview }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <div className="w-[17rem] rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer">
      {/* 리뷰 사진 최대 5개 */}
      {review.reviewImageList && review.reviewImageList.length > 0 ? (
        <div className="relative">
          <img
            className="w-full h-60 object-cover object-center"
            src={review.reviewImageList[activeImage]}
            alt="리뷰 사진"
          />
          {/* 하단의 점 슬라이더 - 이미지가 2개 이상때만 렌더링 */}
          {review.reviewImageList.length > 1 && (
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
              <div className=" bg-black/30 rounded-3xl px-1">
                {review.reviewImageList.map((_, index) => (
                  <span
                    key={index}
                    className={`inline-block h-2 w-2 rounded-full mx-1 cursor-pointer ${
                      index === activeImage ? "bg-MAIN_GREEN" : "bg-[#C8C8C8]"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDotClick(index);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center h-60">
          <Lottie
            options={noImageOptions}
            height={120}
            width={200}
            speed={0.5}
          />
          <p className="text-UNIMPORTANT_TEXT_02 text-center">
            리뷰 사진이 없어요
          </p>
        </div>
      )}

      <div className="p-5 flex flex-col gap-2 text-BLACK">
        <div className="flex justify-between items-center gap-2 text-sm">
          {/* 프로필 */}
          <div className="flex items-center gap-2">
            <img
              src={review.user.profileImageUrl || profile}
              alt="프로필 이미지"
              className="rounded-full overflow-hidden w-7 h-7"
            />
            <p className="text-BLACK font-bold text-base">
              {review.user.nickname}
            </p>
          </div>
          {/* 별점 */}
          <Rating rating={review.score} size={15} gap="gap-[0.7px]" />
        </div>
        {/* 리뷰 내용 */}
        <div className="line-clamp-2 h-[50px]">{review.content}</div>
        {/* 작성일 */}
        <p className="text-[#A0A0A0] text-sm text-end">
          {formatSimpleReviewTime(review.createTime)} 작성
        </p>
      </div>
    </div>
  );
};
export default ReviewItem;
