import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import CampSiteRating from "@/components/reservation/reviewList/CampSiteRating";
import ReviewList from "@/components/reservation/reviewList/ReviewList";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import { useReview } from "@/hooks/review/useReview";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "@/types/model";
import Loading from "@/components/@common/Loading/Loading";
import Lottie from "react-lottie";
import { loadingOptions, warningOptions } from "@/assets/lotties/lottieOptions";

const ReviewListContainer = () => {
  const navigate = useNavigate();
  const { useGetCampScore } = useReview();
  const { campId } = useParams<RouteParams>();
  // console.log("campId : ", campId);
  const campsiteId = campId ? parseInt(campId, 10) : 0;

  // 캠핑장 평점 조회
  const { data: campScore, isLoading, isError } = useGetCampScore(campsiteId);

  // 로딩 중일 때
  if (isLoading) {
    return <Loading />;
  }

  const score = campScore?.data.campsiteScore.score || 0;
  const types = campScore?.data.campsiteScore.indutyList || [];
  const campsiteName = campScore?.data.campsiteScore.campsiteName || "";

  const goToCamp = () => {
    navigate(`/camps/${campsiteId}`);
  };

  return (
    <div className="max-w-[75%] mx-auto pt-2 pb-64">
      {!isLoading && !isError && campScore?.data.campsiteScore && (
        <>
          <div
            onClick={goToCamp}
            className="flex items-end gap-2 cursor-pointer"
          >
            <BackButton route={`/camps/${campsiteId}`} />
            <CampSiteTitle types={types} campsiteName={campsiteName} />
          </div>

          <CampSiteRating rating={score} />
          <ReviewList campsiteId={campsiteId} />
        </>
      )}

      {/* 데이터 에러 발생 시 처리 */}
      {isError && (
        <div className="flex flex-col justify-center items-center h-[350px]">
          <div>
            <Lottie options={warningOptions} height={180} width={250} />
          </div>
          <div className="text-center text-sm text-GRAY">
            <h3 className="text-lg text-BLACK font-bold">다시 시도해주세요</h3>
            <p className="pt-2">불편을 드려 죄송합니다. 😭</p>
          </div>
        </div>
      )}

       {/* 로딩중 UI */}
      {isLoading && (
        <div className="flex flex-col justify-center items-center h-[350px]">
          <div>
            <Lottie options={loadingOptions} height={200} width={300} />
          </div>
          <div className="text-center text-sm text-GRAY">
            <h3 className="text-base font-bold text-[#A0A0A0]">로딩 중...</h3>
            <p>잠시만 기다려주세요 😀</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewListContainer;
