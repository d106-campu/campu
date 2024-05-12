import CampSiteTitle from "@/components/reservation/reviewList/CampSiteTitle";
import CampSiteRating from "@/components/reservation/reviewList/CampSiteRating";
import ReviewList from "@/components/reservation/reviewList/ReviewList";

const ReviewListContainer = () => {
  const reviewList = data.reviewList;
  return (
    <div className="max-w-[75%] mx-auto py-2">
      <CampSiteTitle types={data.types} campsiteName={data.campsite_faclt_nm} />
      <CampSiteRating rating={data.rating} />
      <ReviewList
        campsiteId={data.id}
        totalReview={reviewList.totalElements}
        reviews={reviewList.content}
      />
    </div>
  );
};
export default ReviewListContainer;

// 더미 이미지
import dummy_1 from "@/assets/images/bg_loginD.jpg";
import dummy_2 from "@/assets/images/AutoCamping.png";
import dummy_3 from "@/assets/images/dummyCamping.png";
import photo6 from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";

// 더미 데이터
const data = {
  id: 1,
  campsite_faclt_nm: "캠프유캠푸 캠핑장",
  rating: 3.5,
  types: ["오토캠핑", "글램핑", "카라반"],

  reviewList: {
    content: [
      {
        id: 1,
        user: {
          nickname: "캠핑러버",
          profileImageUrl: dummy_1,
        },
        content:
          "캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판 빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
        score: 4.8,
        createTime: "2024.04.22",
        reviewImageList: [photo1, photo2, photo3, photo4, photo5],
      },
      {
        id: 2,
        user: {
          nickname: "캐치캐치캠핑핑",
          profileImageUrl: dummy_2,
        },
        content:
          "지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다. 전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요 ",
        score: 4.8,
        createTime: "2024.04.20",
        reviewImageList: [photo2, photo3, photo1],
      },
      {
        id: 3,
        user: {
          nickname: "캠프유캠푸",
          profileImageUrl: dummy_3,
        },
        content:
          "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
        score: 4.0,
        createTime: "2024.04.15",
        reviewImageList: [photo4],
      },
      {
        id: 4,
        user: {
          nickname: "캠프유캠푸",
          profileImageUrl: dummy_3,
        },
        content:
          "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
        score: 4.0,
        createTime: "2024.04.15",
        reviewImageList: [photo3],
      },
      {
        id: 5,
        user: {
          nickname: "캠프유캠푸",
          profileImageUrl: dummy_2,
        },
        content:
          "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
        score: 4.0,
        createTime: "2024.04.15",
        reviewImageList: [photo4, photo3],
      },
      {
        id: 6,
        user: {
          nickname: "캠핑러버123",
          profileImageUrl: "",
        },
        content:
          "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
        score: 3,
        createTime: "2024.04.15",
        reviewImageList: [photo1, photo5, photo5, photo1, photo5],
      },
      {
        id: 7,
        user: {
          nickname: "아아아아",
          profileImageUrl: dummy_1,
        },
        content:
          "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
        score: 5,
        createTime: "2024.04.12",
        reviewImageList: [photo6, photo1, photo3],
      },
      {
        id: 8,
        user: {
          nickname: "캠프유캠푸",
          profileImageUrl: dummy_2,
        },
        content:
          "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
        score: 4.0,
        createTime: "2024.04.15",
        reviewImageList: [photo4],
      },
      {
        id: 9,
        user: {
          nickname: "캠핑러버",
          profileImageUrl: dummy_1,
        },
        content:
          "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
        score: 3,
        createTime: "2024.04.10",
        reviewImageList: [],
      },
      {
        id: 10,
        user: {
          nickname: "캠핑러버",
          profileImageUrl: dummy_2,
        },
        content:
          "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
        score: 3,
        createTime: "2024.04.10",
        reviewImageList: [],
      },
    ],
    totalElements: 9,
  },
};
