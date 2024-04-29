import { FaStar } from "react-icons/fa6";
import ReviewItem from "./ReviewItem";

// 더미데이터
const data = {
  checkIn: "14:00",
  checkOut: "11:00",
  mannerTime: "23:00 - 07:00",
  rating: 4.5,
  totalReview: 10,
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
      id: 4,
      nickname: "캠핑러버",
      content:
        "반려동물 동반할 수 있는 캠핑장 중 가장 좋았던 것 같아요! 캠핑뷰도 좋았고 시설도 깔끔하고 좋았어요!! 특히 전기장판빌려주셨던 사장님덕분에 추위에떨지않고 잘잘수있었습니다!! 사장님 너무 친절하세요",
      date: "2024.04.22",
    },
  ],
  owner: {
    name: "김싸피",
    campSite: "캠프유캠푸 캠핑장",
    adress: "경상북도 칠곡군 가산면 금화리 산49-1 캠프유캠푸 캠핑장",
    email: "ssafy@d106.com",
    businessNumber: "425-45-00307",
    industryNumber: "대구시 2024-11호",
  },
};

const InfoDetail = () => {
  // @TODO: 추후 보여줄 개수 수정해야함
  const reviews = data.reviews.slice(0, 3);

  return (
    <>
      {/* 기본 정보 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">기본 정보</h3>
        <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
          <p>
            입실 · 퇴실 시간 : {data.checkIn} - {data.checkOut}
          </p>
          <p className="py-1">매너타임 : {data.mannerTime}</p>
        </div>
      </div>

      {/* 시설 및 레저 */}

      {/* 방문자 리뷰 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">방문자 리뷰</h3>
        <div className="flex justify-between pt-1">
          <div className="flex items-center text-BLACK font-bold">
            <FaStar size={18} className="text-yellow-500 mx-1" />
            <p className="pr-2">{data.rating}</p>
            <p className="text-[#919191] text-sm">
              {data.totalReview}명의 평가
            </p>
          </div>
          {/* @TODO: 클릭 시 리뷰 페이지로 이동하기 */}
          <p className="text-MAIN_GREEN font-bold">리뷰 보기</p>
        </div>

        <div className="flex gap-5 py-2">
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      </div>

      {/* 캠핑장 운영정책 */}

      {/* 사업자 정보 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">사업자 정보</h3>
        <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
          <p className="pb-1">
            대표자명 : <span className="text-[#393939]">{data.owner.name}</span>
          </p>
          <p className="pb-1">
            상호명 :{" "}
            <span className="text-[#393939]">{data.owner.campSite}</span>
          </p>
          <p className="pb-1">
            사업자 주소 :{" "}
            <span className="text-[#393939]">{data.owner.adress}</span>
          </p>
          <p className="pb-1">
            사업장 등록 번호 :{" "}
            <span className="text-[#393939]">{data.owner.businessNumber}</span>
          </p>
          <p className="pb-1">
            관광사업(야영장) 등록 번호 :{" "}
            <span className="text-[#393939]">{data.owner.industryNumber}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default InfoDetail;
