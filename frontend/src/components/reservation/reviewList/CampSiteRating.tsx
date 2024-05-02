import Rating from "@/components/@common/Review/Rating";

interface ICampSiteRatingProps {
  rating: number;
}

const CampSiteRating = ({ rating }: ICampSiteRatingProps) => {
  const displayRating = rating.toFixed(1); // 소수점 한 자리로 표시
  return (
    <>
      {/* 별점 */}
      <div className="flex flex-col">
        <div className="flex justify-center text-lg">
          <p className="text-UNIMPORTANT_TEXT_02 font-semibold">
            <span className="text-MAIN_GREEN">{displayRating}</span> / 5.0
          </p>
        </div>
        <div className="flex justify-center">
          <Rating rating={rating} size={35} />
        </div>
      </div>
    </>
  );
};
export default CampSiteRating;
