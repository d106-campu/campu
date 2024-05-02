import { IMyReviewList } from '@/types/review';
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";

// 더미데이터 6개
const dummyReviews: IMyReviewList = {
  totalMyReview: 6,
  reviews: [
    {
      campsiteName: "캠프유캠핑 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo1]
    },
    {
      campsiteName: "히히히헤헤 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo2]
    },
    {
      campsiteName: "흐흐흐흐흐 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo3]
    },
    {
      campsiteName: "캠프유캠핑 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo1]
    },
    {
      campsiteName: "히히히헤헤 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo2]
    },
    {
      campsiteName: "흐흐흐흐흐 캠핑장",
      content: `지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다.
      전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 😊 
      반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!!! 🐕 🐈 🐕 🦮 🐩 
      캠핑뷰도 좋았고 🌲🌲 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!!
      사장님 너무 친절하세요  반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요!
      친절한 사장님 덕분에 너무 행복했던 캠핑이었습니다. 잘 묵다 갑니다 👍👍`,
      area: "A구역(벚꽃 캠핑존) 10",
      date: "2024.04.22 작성",
      rating: 4.8,
      images: [photo3]
    },
    // 추가 리뷰 데이터...
  ]
};

export default dummyReviews;