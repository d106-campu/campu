import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import ReviewForm from "@/components/reservation/reviewList/writeReview/ReviewForm";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";
import { useReview } from "@/hooks/review/useReview";
import { useLocation } from "react-router-dom";

const WriteReviewContainer = () => {
  const location = useLocation();
  const { campsiteId, reservationId, startDate, endDate } =
    location.state || {}; // state가 없을 경우를 대비해 기본값 설정

  // 캠핑장 이름, 타입 조회
  const { useGetCampScore } = useReview();
  const { data: campScore } = useGetCampScore(campsiteId);
  const types = campScore?.data.campsiteScore.indutyList || [];
  const campsiteName = campScore?.data.campsiteScore.campsiteName || "";

  return (
    <>
      <div className="max-w-[55%] w-[50%] mx-auto py-2">
        <div className="flex items-end gap-2">
          {/* 캠핑장 이름 */}
          <BackButton route={`/camps/${campsiteId}/reviews`} />
          <CampSiteTitle types={types} campsiteName={campsiteName} />

          {/* 내 캠핑일자 */}
          <p className="font-bold text-MAIN_GREEN pl-3">
            {`${formatDate(startDate)} ~ ${formatSimpleDate(
              endDate
            )} · ${diffDays(startDate, endDate)}박 `}
          </p>
        </div>
        <ReviewForm reservationId={reservationId} campsiteId={campsiteId} />
      </div>
    </>
  );
};
export default WriteReviewContainer;
