import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import ReviewItem from "@/components/review/ReviewItem";
import Rating from "@/components/review/Rating";

// 더미 이미지
import dummy_profile_1 from "@/assets/images/bg_loginD.jpg";
import dummy_profile_2 from "@/assets/images/AutoCamping.png";
import dummy_profile_3 from "@/assets/images/dummyCamping.png";
import photo6 from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";

const ReviewPage = () => {
  const displayRating = data.rating.toFixed(1); // 소수점 한 자리로 표시
  return (
    <>
      <Header />
      <div className="max-w-[70%] mx-auto py-2">
        {/* 캠핑장 이름 */}
        <div className="pt-7">
          {data.types.map((type, index) => (
            <span key={index} className="text-UNIMPORTANT_TEXT_01">
              {type}
              {index < data.types.length - 1 && (
                <span className="text-UNIMPORTANT_TEXT_01 p-1">·</span>
              )}
            </span>
          ))}
          <h1 className="font-bold text-3xl">{data.campsite_faclt_nm}</h1>

          {/* 별점 */}
          <div className="flex flex-col">
            <div className="flex justify-center text-lg">
              <p className="text-UNIMPORTANT_TEXT_02 font-semibold">
                <span className="text-MAIN_GREEN">{displayRating}</span> / 5.0
              </p>
            </div>
            <div className="flex justify-center">
              <Rating rating={data.rating} size={35} />
            </div>
          </div>

          {/* 리뷰 */}
          <h3 className="font-bold text-xl py-2">
            방문자 리뷰
            <span className="text-MAIN_GREEN pl-2">{data.totalReview}</span>
          </h3>
          <div className="flex flex-wrap justify-start gap-5 ml-[20px] my-2 pb-10">
            {data.reviews &&
              data.reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ReviewPage;

const data = {
  id: 1,
  campsite_faclt_nm: "캠프유캠푸 캠핑장",
  rating: 3.5,
  types: ["오토캠핑", "글램핑", "카라반"],
  totalReview: 9,
  reviews: [
    {
      id: 1,
      nickname: "캠핑러버",
      profile: dummy_profile_1,
      content:
        "캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판 빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      rating: 4.8,
      date: "2024.04.22",
      images: [photo5, photo1, photo3],
    },
    {
      id: 2,
      nickname: "캐치캐치캠핑핑",
      profile: dummy_profile_2,
      content:
        "지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다. 전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요 ",
      rating: 4.8,
      date: "2024.04.20",
      images: [photo2, photo3, photo1],
    },
    {
      id: 3,
      nickname: "캠프유캠푸",
      profile: dummy_profile_3,
      content:
        "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
      rating: 4.0,
      date: "2024.04.15",
      images: [photo4],
    },
    {
      id: 4,
      nickname: "캠프유캠푸",
      profile: dummy_profile_3,
      content:
        "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
      rating: 4.0,
      date: "2024.04.15",
      images: [photo3],
    },
    {
      id: 5,
      nickname: "캠프유캠푸",
      profile: dummy_profile_3,
      content:
        "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
      rating: 4.0,
      date: "2024.04.15",
      images: [photo4, photo3],
    },
    {
      id: 6,
      nickname: "캠핑러버123",
      profile: "",
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      rating: 3,
      date: "2024.04.15",
      images: [photo1, photo5, photo5, photo1, photo5],
    },
    {
      id: 7,
      nickname: "아아아아",
      profile: dummy_profile_2,
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      rating: 5,
      date: "2024.04.12",
      images: [photo6, photo1, photo3],
    },
    {
      id: 8,
      nickname: "캠프유캠푸",
      profile: dummy_profile_3,
      content:
        "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
      rating: 4.0,
      date: "2024.04.15",
      images: [photo4],
    },
    {
      id: 9,
      nickname: "캠핑러버",
      profile: dummy_profile_1,
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      rating: 3,
      date: "2024.04.10",
      images: [],
    },
    {
      id: 10,
      nickname: "캠핑러버",
      profile: dummy_profile_1,
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      rating: 3,
      date: "2024.04.10",
      images: [],
    },
  ],
};
