import Lottie from "react-lottie";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CampsiteIntro from "@/components/reservation/CampSiteIntro";
import ReservationContainer from "@/components/reservation/ReservationContainer";
import InfoDetail from "@/components/reservation/InfoDetail";
import { RefProvider } from "@/context/RefContext";
import { ICampsite } from "@/types/reservation";
import { RouteParams } from "@/types/model";
import { useReview } from "@/hooks/review/useReview";
import { useReservation } from "@/hooks/reservation/useReservation";
import { setCampsiteData } from "@/features/reservation/campsiteSlice";
import { loadingOptions } from "@/assets/lotties/lottieOptions";

const CampSiteContainer = () => {
  const { campId } = useParams<RouteParams>();
  const campsiteId = campId ? parseInt(campId, 10) : 0;

  // 로그인 상태 확인
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  // 캠핑장 상세 조회
  const { useGetCampsite } = useReservation();
  const { data, isLoading } = useGetCampsite(campsiteId, isLogin);

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

  // Redux 디스패치 사용
  const dispatch = useDispatch();

  const selectCampsiteData = (data: ICampsite) => {
    const {
      id,
      facltNm,
      tel,
      addr1,
      addr2,
      campsiteLocation,
      score,
      checkin,
      checkout,
    } = data;
    return {
      id,
      facltNm,
      tel,
      addr1,
      addr2,
      mapX: campsiteLocation.mapX,
      mapY: campsiteLocation.mapY,
      score,
      checkIn: checkin,
      checkOut: checkout,
    };
  };

  useEffect(() => {
    if (campsiteData) {
      // 필요한 데이터만 Redux 스토어에 저장
      const selectedData = selectCampsiteData(campsiteData);
      dispatch(setCampsiteData(selectedData));
    }
  }, [campsiteData, dispatch]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center mx-auto">
          <Lottie options={loadingOptions} height={90} width={200} />
          <p className="text-[#1c93897a] text-lg font-semibold pt-3">로딩 중</p>
          <p className="text-sm text-GRAY">잠시만 기다려 주세요</p>
        </div>
      </div>
    );
  }

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
