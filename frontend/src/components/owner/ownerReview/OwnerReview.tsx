import CampSiteRating from "@/components/reservation/reviewList/CampSiteRating";
import ReviewList from "@/components/reservation/reviewList/ReviewList";
import { useReview } from "@/hooks/review/useReview";
import { useMemo } from "react";

const OwnerReview = ({
  selectCampground,
}: {
  selectCampground: number | null;
}) => {
  const { useGetCampScore } = useReview();
  const { data: campScore } = useGetCampScore(selectCampground!);
  const score = useMemo(
    () => campScore?.data.campsiteScore.score || 0,
    [campScore]
  );
  return (
    <>
      <div className="py-5">
        <div className="border py-10 rounded-lg">
          <p className="text-center pb-4 font-semibold text-xl">
            <span className="text-MAIN_GREEN">
              {campScore?.data.campsiteScore.campsiteName}
            </span>
            의 별점입니다.
          </p>

          <CampSiteRating rating={score} />
        </div>

        <ReviewList campsiteId={selectCampground!} />
      </div>
    </>
  );
};

export default OwnerReview;
