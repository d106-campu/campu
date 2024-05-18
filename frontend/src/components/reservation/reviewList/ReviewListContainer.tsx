import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import CampSiteRating from "@/components/reservation/reviewList/CampSiteRating";
import ReviewList from "@/components/reservation/reviewList/ReviewList";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import { useReview } from "@/hooks/review/useReview";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "@/types/model";
import Loading from "@/components/@common/Loading/Loading";

const ReviewListContainer = () => {
  const navigate = useNavigate();
  const { useGetCampScore } = useReview();
  const { campId } = useParams<RouteParams>();
  // console.log("campId : ", campId);
  const campsiteId = campId ? parseInt(campId, 10) : 0;

  // 캠핑장 평점 조회
  const { data: campScore, isLoading, error } = useGetCampScore(campsiteId);

  // 로딩 중일 때
  if (isLoading) {
    return <Loading />;
  }

  // 에러 발생 시
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }
  const score = campScore?.data.campsiteScore.score || 0;
  const types = campScore?.data.campsiteScore.indutyList || [];
  const campsiteName = campScore?.data.campsiteScore.campsiteName || "";

  const goToCamp = () => {
    navigate(`/camps/${campsiteId}`);
  };

  return (
    <div className="max-w-[75%] mx-auto pt-2 pb-64">
      <div onClick={goToCamp} className="flex items-end gap-2 cursor-pointer">
        <BackButton route={`/camps/${campsiteId}`} />
        <CampSiteTitle types={types} campsiteName={campsiteName} />
      </div>

      <CampSiteRating rating={score} />
      <ReviewList campsiteId={campsiteId} />
    </div>
  );
};
export default ReviewListContainer;
