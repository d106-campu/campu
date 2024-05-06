import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import BackButton from "@/components/reservation/reviewList/review/BackButton";
import ReviewForm from "@/components/reservation/reviewList/writeReview/ReviewForm";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";

const WriteReviewContainer = () => {
  return (
    <div className="max-w-[55%] mx-auto py-2">
      <div className="flex items-end gap-2">
        <BackButton route={`/camps/${campData.id}/reviews`} />
        <CampSiteTitle
          types={campData.types}
          campsiteName={campData.campsite_faclt_nm}
        />
        <p className="font-bold text-MAIN_GREEN pl-3">
          {`${formatDate(userData.startDate)} ~ ${formatSimpleDate(
            userData.endDate
          )} · ${diffDays(userData.startDate, userData.endDate)}박 `}
        </p>
      </div>
      <ReviewForm />
    </div>
  );
};
export default WriteReviewContainer;

// 더미 이미지
import dummy_profile_1 from "@/assets/images/bg_loginD.jpg";

// 더미 데이터
const campData = {
  id: 1,
  campsite_faclt_nm: "캠프유캠푸 캠핑장",
  types: ["오토캠핑", "글램핑", "카라반"],
};

const userData = {
  id: 1,
  nickname: "캠핑러버",
  profile: dummy_profile_1,
  startDate: "2024-05-03",
  endDate: "2024-05-06",
  //   content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다. 전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊
  //       반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩
  //       캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
  //       친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
  //   rating: 4.8,
  //   date: "2024.04.22",
  //   images: [photo1, photo2, photo3, photo4, photo5],
};
