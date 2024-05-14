import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import ReviewPhotos from "@/components/reservation/reviewList/review/ReviewPhotos";
import { useReview } from "@/hooks/review/useReview";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "@/types/model";

const ReviewContainer = () => {
  const navigate = useNavigate();
  const { useGetCampScore } = useReview();
  const { campId } = useParams<RouteParams>();
  const campsiteId = campId ? parseInt(campId, 10) : 0;

  // 캠핑장 평점 조회
  const { data: campScore } = useGetCampScore(campsiteId);
  const types = campScore?.data.campsiteScore.indutyList || [];
  const campsiteName = campScore?.data.campsiteScore.campsiteName || "";

  const goToReviewList = () => {
    navigate(`/camps/${campsiteId}/reviews`);
  };

  return (
    <div className="max-w-[60%] w-[50%] mx-auto py-2">
      <div
        onClick={goToReviewList}
        className="flex items-end gap-2 cursor-pointer"
      >
        <BackButton route={`/camps/${campsiteId}/reviews`} />
        <CampSiteTitle types={types} campsiteName={campsiteName} />
      </div>
      <ReviewPhotos
        images={reviewData.images}
        nickname={reviewData.nickname}
        profile={reviewData.profile}
        date={reviewData.date}
      />
      <ReviewContent
        content={reviewData.content}
        date={reviewData.date}
        rating={reviewData.rating}
      />
    </div>
  );
};
export default ReviewContainer;

// 더미 이미지
import dummy_profile_1 from "@/assets/images/bg_loginD.jpg";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";
import ReviewContent from "./ReviewContent";

const reviewData = {
  id: 1,
  nickname: "캠핑러버",
  profile: dummy_profile_1,
  content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다. 전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
    반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
    캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
    친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
  rating: 4.8,
  date: "2024.04.22",
  images: [photo1, photo2, photo3, photo4, photo5],
};
