import defaultProfile from "@/assets/images/profile.png"; // 기본 프로필
import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import ReviewPhotos from "@/components/reservation/reviewList/review/ReviewPhotos";
import ReviewContent from "@/components/reservation/reviewList/review/ReviewContent";
import { useReview } from "@/hooks/review/useReview";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "@/types/model";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Toast from "@/components/@common/Toast/Toast";

const ReviewContainer = () => {
  const navigate = useNavigate();
  const { useGetReview, useDeleteReview } = useReview();
  const { campId, reviewId: Id } = useParams<RouteParams>();
  const campsiteId = campId ? parseInt(campId, 10) : 0;
  const reviewId = Id ? parseInt(Id, 10) : 0;

  const [isHover, setIsHover] = useState<boolean>(false); // 호버 상태 관리

  // 리뷰 상세 조회
  const { data } = useGetReview(reviewId);
  const reviewData = data?.data.reviewDetail;
  const types = reviewData?.indutyList || [];
  const campsiteName = reviewData?.campsiteName || "";

  // 리뷰 삭제
  const { mutate: deleteReview } = useDeleteReview();

  const handleDeleteReview = (reviewId: number) => {
    deleteReview(reviewId, {
      onSuccess: () => {
        navigate(`/camps/${campsiteId}/reviews`);
        Toast.success("리뷰가 정상적으로 삭제되었습니다");
      },
      onError: () => {
        Toast.error("리뷰 삭제에 실패했습니다. 다시 시도해주세요 😥");
      },
    });
  };

  const goToReviewList = () => {
    navigate(`/camps/${campsiteId}/reviews`);
  };

  return (
    reviewData && (
      <>
        <div className="w-[830px] mx-auto py-2">
          <div className="flex justify-between items-end">
            <div
              onClick={goToReviewList}
              className="flex items-end gap-2 cursor-pointer"
            >
              <BackButton route={`/camps/${campsiteId}/reviews`} />
              <CampSiteTitle types={types} campsiteName={campsiteName} />
            </div>
            {/* 리뷰 삭제 버튼 */}
            {reviewData.mine && (
              <button
                onClick={() => handleDeleteReview(reviewId)}
                className="flex items-end gap-1"
              >
                {isHover && <div className="text-MAIN_PINK">삭제하기</div>}
                <RiDeleteBin5Fill
                  size={25}
                  className="text-[#A0A0A0] hover:text-MAIN_PINK cursor-pointer pb-1"
                  onMouseEnter={() => setIsHover(true)} // 호버 시작 시
                  onMouseLeave={() => setIsHover(false)} // 호버 종료 시
                />
              </button>
            )}
          </div>
          <ReviewPhotos
            images={reviewData.reviewImageList}
            nickname={reviewData.user.nickname}
            profile={reviewData.user.profileImageUrl || defaultProfile}
            date={reviewData.createTime}
          />
          <ReviewContent
            content={reviewData.content}
            date={reviewData.visitDate}
            rating={reviewData.score}
          />
        </div>
      </>
    )
  );
};
export default ReviewContainer;
