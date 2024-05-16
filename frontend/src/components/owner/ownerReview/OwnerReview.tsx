import { RootState } from "@/app/store";
import CampSiteRating from "@/components/reservation/reviewList/CampSiteRating";
import ReviewList from "@/components/reservation/reviewList/ReviewList";
import { useReview } from "@/hooks/review/useReview";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const selectCampsiteInfo = createSelector(
  (state: RootState) => state.ownerSide.campsiteId,
  (campsiteId) => ({ campsiteId })
);

const OwnerReview = () => {
  const { useGetCampScore } = useReview();
  const { campsiteId } = useSelector(selectCampsiteInfo);
  const { data: campScore } = useGetCampScore(campsiteId!);
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

        <ReviewList campsiteId={campsiteId!} />
      </div>
    </>
  );
};

export default OwnerReview;
