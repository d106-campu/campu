import CampsiteIntro from "@/components/reservation/CampSiteIntro";
import ReservationContainer from "@/components/reservation/ReservationContainer";
import InfoDetail from "@/components/reservation/InfoDetail";
import { RefProvider } from "@/context/RefContext";
import { useParams } from "react-router-dom";
import { RouteParams } from "@/types/model";
import { useReservation } from "@/hooks/reservation/useReservation";
import { useReview } from "@/hooks/review/useReview";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const CampSiteContainer = () => {
  const { campId } = useParams<RouteParams>();
  const campsiteId = campId ? parseInt(campId, 10) : 0;

  // 로그인 상태 확인
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  // 캠핑장 상세 조회
  const { useGetCampsite } = useReservation();
  const { data } = useGetCampsite(campsiteId, isLogin);

  const campsiteData = data?.data?.campsite;

  // 리뷰 목록 조회
  const { useGetReviewList } = useReview();
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetReviewList({
    campsiteId: campsiteId,
    page: 0,
    size: 3,
  });

  const reviewList = reviewsData?.data?.reviewList || null;
  const totalReview = reviewList?.totalElements || 0;

  return (
    <RefProvider>
      {campsiteData && (
        <div className="max-w-[70%] mx-auto py-2">
          <CampsiteIntro data={{ ...campsiteData, totalReview }} />
          <ReservationContainer campsiteId={campsiteId} />
          <InfoDetail
            data={campsiteData}
            reviewList={reviewList}
            isReviewsLoading={isReviewsLoading}
          />
        </div>
      )}
    </RefProvider>
  );
};
export default CampSiteContainer;
