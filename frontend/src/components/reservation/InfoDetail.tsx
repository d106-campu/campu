import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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

const InfoDetail = () => {
  // @TODO: 추후 보여줄 개수 수정해야함
  const reviews = data.reviews.slice(0, 3);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!wrapperRef.current || !contentRef.current) return;

    if (!isOpen) {
      wrapperRef.current.style.height = `${contentRef.current.clientHeight}px`;
      setIsOpen(true);
    } else {
      wrapperRef.current.style.height = "0px";
      setIsOpen(false);
    }
  };

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
      <div className="pt-10">
        <h3 className="text-xl font-bold pb-2">캠핑장 운영정책</h3>

        {/* 아코디언 */}
        <div className="rounded-2xl border">
          <div className="w-full">
            <div
              className="p-2 mx-3 flex justify-between border-b-[1px] cusrsor-pointer"
              onClick={handleOpen}
            >
              <div className="text-SUB_BLACK p-2">
                <p className="font-bold">
                  행복한 캠핑을 위해 필독 후 이용 부탁드립니다.
                </p>
                <p className="text-sm">
                  캠핑장 운영정책에는 환불 양도양수 시설 이용시간 등 캠핑장
                  이용에 관한 가이드를 포함되어 있습니다.
                </p>
              </div>
              <div className="mt-auto pb-2 text-sm text-MAIN_GREEN  font-bold">
                {isOpen ? (
                  <div className="flex items-center">
                    <p className="pr-2">닫기</p>
                    <IoIosArrowUp size="25" color="#186D41" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="pr-2">더보기</p>
                    <IoIosArrowDown size="25" color="#186D41" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            ref={wrapperRef}
            className="mx-3 h-0 overflow-hidden text-BLACK transition-all ease-in duration-500"
          >
            <div ref={contentRef} className="p-4 whitespace-pre-wrap">
              {data.policy}
            </div>
          </div>
        </div>
      </div>

      {/* 사업자 정보 */}
      <div className="py-10">
        <h3 className="text-xl font-bold">사업자 정보</h3>
        <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
          <p className="pb-1">
            대표자명 :{" "}
            <span className="text-[#393939] pl-1">{data.owner.name}</span>
          </p>
          <p className="pb-1">
            상호명 :
            <span className="text-[#393939] pl-1">{data.owner.campSite}</span>
          </p>
          <p className="pb-1">
            사업자 주소 :
            <span className="text-[#393939] pl-1">{data.owner.adress}</span>
          </p>
          <p className="pb-1">
            사업장 등록 번호 :
            <span className="text-[#393939] pl-1">
              {data.owner.businessNumber}
            </span>
          </p>
          <p className="pb-1">
            관광사업(야영장) 등록 번호 :
            <span className="text-[#393939] pl-1">
              {data.owner.industryNumber}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default InfoDetail;
