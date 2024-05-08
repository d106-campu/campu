import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import CampsiteIntro from "@/components/reservation/CampSiteIntro";
import ReservationContainer from "@/components/reservation/ReservationContainer";
import InfoDetail from "@/components/reservation/InfoDetail";
import { RefProvider } from "@/context/RefContext";

// @TODO: API 명세서 나오면 Props 수정 필요
const ReservationPage = () => {
  return (
    <RefProvider>
      <Header />
      <div className="max-w-[70%] mx-auto py-2">
        <CampsiteIntro data={data} />
        <ReservationContainer />
        <InfoDetail data={data} reviewsData={reviews} />
      </div>
      <Footer />
    </RefProvider>
  );
};

export default ReservationPage;

// @TODO: API 명세서 나오면 수정 필요
// 더미 이미지
import mainPhoto from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";
import layout from "@/assets/images/dummy/dummyCampsiteLayout.jpeg";

// 더미데이터
const data = {
  id: 1,
  campsite_faclt_nm: "캠프유캠푸 캠핑장",
  campsite_tel: "010-1234-5678",
  campsite_addr1: "경상북도 칠곡군 가산면 금화리 산 49-1",
  campsite_addr2: "캠프유캠푸 캠핑장",
  types: ["오토캠핑", "글램핑", "카라반"],
  isLiked: true,
  totalReview: 7,
  main: mainPhoto,
  other: [photo1, photo2, photo3, photo4, photo5],
  layout: layout,
  description: "🌳🌸 깔끔하고 분위기 좋은 신상 캠핑 숙소 🌸🌳",
  detailDescription: `프라이빗 캠프유캠푸 캠핑장 신규오픈 했어요! 경북 칠곡군 가산면 내에 위치하였고 피크닉과 캠핑을 선택하여 즐길 수 있도록 각각의 개별동으로 사이트를 만들어놓았습니다.
개별 사이크 내 바베큐존에서 호수의 낭만과 경치를 한번에 즐길 수 있는 힐링 캠핑공간입니다~`,
  location: "경상북도 구미시",
  thema: ["물놀이", "애견동반"],
  checkIn: "14:00",
  checkOut: "11:00",
  mannerTime: "23:00 - 07:00",
  rating: 4.5,
  owner: {
    name: "김싸피",
    campSite: "캠프유캠푸 캠핑장",
    adress: "경상북도 칠곡군 가산면 금화리 산49-1 캠프유캠푸 캠핑장",
    email: "ssafy@d106.com",
    businessNumber: "425-45-00307",
    industryNumber: "대구시 2024-11호",
  },
  policy: `[알립니다]
  ※ 입실시간 안내
  입실시간 : 13:00 ~ 22:00
  퇴실시간 : 12:00
  
  1. 입실 / 퇴실 시간
  - 입실 : 오후 1시 ~ 오후 10시 (타인을 위하여 늦은 입장은 자제해주세요)
  - 퇴실 : 낮 12시, 다음 예약자를 배려하여 꼭 지켜주세요.
  * 관리실에서 예약을 확인을 하고 입장해주세요.
  * 방문객은 반드시 10시 이전에 퇴장해 주세요. (연휴기간과 성수기 기간에는 꼭 지켜주세요. 불가피하게 방문하시는 분은 추가요금 발생합니다)
  
  2. 전기사용
  - 20M 릴선이면 사용 가능합니다.
  - 사용가능 전자제품 : 전등, 전기장판, 선풍기, 휴대용 충전기
  - 사용금지 전자제품 : 전기히터, 온풍기, 휴대용 에어컨, 전기밥솥, 전기그릴, 휴대용 냉장고 등
  
  3. 매점운영
  - 판매 : 아이스크림, 생수, 얼음, 칵테일얼음, 모기향 등
  - 비상약품 : 소화제, 밴드, 두통약 등
  - 일회용품 : 종이컵, 숟가락, 나무젓가락, 세면도구 셋트 등
  - 각종식품 : 즉석밥, 라면, 컵라면, 쌈장, 고추장, 참치캔, 각종 과자류, 맥주, 소주, 음료수, 생수, 믹스커피 등
  - 기타 : 장작, 부탄가스, 번개탄, 석쇠 등
  
  3. 애완견
  - 2.5kg 이하 소형견 가능하나 목줄은 꼭 매주세요
  - 다른 손님에게 피해가 없도록 견주님이 잘 보호해주세요
  
  3. 폭죽금지
  - 화재예방을 위하여 캠핑장 내 폭죽놀이를 금지합니다.`,
};

const reviews = {
  totalReview: 7,
  reviews: [
    {
      id: 1,
      nickname: "캠핑러버",
      content:
        "캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판 빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      date: "2024.04.22",
    },
    {
      id: 2,
      nickname: "캐치캐치캠핑핑",
      content:
        "지인 소개로 가게 된 캠핑장. 반려동물 동반에 평일 솔캠인데 조용하게 힐링하다 왔습니다. 전세캠으로 사이트도 원하는 곳 쓰게 해주셔서 너무 좋은 시간을 보냈습니다. 반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요 ",
      date: "2024.04.22",
    },
    {
      id: 3,
      nickname: "캠프유캠푸",
      content:
        "캠핑뷰도 너무 좋았고 시설도 신설에다가 너무 깔끔해요!! 특히 사장님이 너무 친절하십니다!!",
      date: "2024.04.22",
    },
    {
      id: 5,
      nickname: "캠핑러버",
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      date: "2024.04.22",
    },
    {
      id: 6,
      nickname: "캠핑러버",
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      date: "2024.04.22",
    },
    {
      id: 7,
      nickname: "캠핑러버",
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      date: "2024.04.22",
    },
  ],
};
