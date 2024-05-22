import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRefs } from "@/context/RefContext";
import { scrollToTop } from "@/utils/scrollToTop";
import { IReviewList } from "@/types/review";
import { ICampsiteOwner } from "@/types/reservation";
import FacilityList from "@/components/reservation/FacilityList";
import SimpleReviewItem from "@/components/reservation/SimpleReviewItem";
import Loading from "@/components/@common/Loading/Loading";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

interface ICampsiteData {
  id: number;
  owner: ICampsiteOwner;
  facltNm: string; // 캠핑장명
  tel: string; // 캠핑장 연락처
  addr1: string; // 주소
  addr2: string | null; // 상세 주소
  allar: number; // 전체 면적
  bizrno: string; // 사업자 등록 번호
  trsagntNo: string; // 관광 사업자 등록 번호
  facltList: string[]; // 시설
  score: number; // 별점
  sitedStnc: number; // 사이트간 거리
  animalCmgCl: string; // 애완동물출입
  checkin: string | null; // 체크인 시간
  checkout: string | null; // 체크아웃 시간
}

interface IInfoDetailProps {
  data: ICampsiteData;
  reviewList: IReviewList | null;
  isReviewsLoading: boolean;
}

const InfoDetail = ({
  data,
  reviewList,
  isReviewsLoading,
}: IInfoDetailProps) => {
  const navigate = useNavigate();
  const { reviewRef } = useRefs();

  // 아코디언
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

  const policy = `[알립니다]
  ※ 입실시간 안내
  입실시간 : ${data.checkin === null ? "13:00" : data.checkin} ~ 22:00
  퇴실시간 : ${data.checkout === null ? "11:00" : data.checkout}
  
  1. 입실 / 퇴실 시간
  - 입실 : ${
    data.checkin === null ? "13:00" : data.checkin
  } ~ 22:00 (타인을 위하여 늦은 입장은 자제해주세요.)
  - 퇴실 : ${
    data.checkout === null ? "11:00" : data.checkout
  } (다음 예약자를 배려하여 꼭 지켜주세요.)
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
  
  4. 폭죽금지
  - 화재예방을 위하여 캠핑장 내 폭죽놀이를 금지합니다.
  ${
    data.animalCmgCl !== "불가능"
      ? `
  5. 애완견
  - 2.5kg 이하 소형견 가능하나 목줄은 꼭 매주세요.
  - 다른 손님에게 피해가 없도록 견주님이 잘 보호해주세요.`
      : ""
  }
  `;

  return (
    <>
      {/* 기본 정보 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">기본 정보</h3>
        <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
          {data.checkin && (
            <p>
              입실 · 퇴실 시간 : {data.checkin} - {data.checkout}
            </p>
          )}
          <p className="py-1">전체 면적 : {data.allar} m²</p>
          {data.sitedStnc !== 0 && (
            <p className="py-1">사이트 간 거리 : {data.sitedStnc} m</p>
          )}
        </div>
      </div>

      {/* 시설 및 레저 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">시설 및 레저</h3>
        <FacilityList
          facilities={data.facltList}
          pet={data.animalCmgCl === "불가능" ? false : true}
        />
      </div>

      {/* 방문자 리뷰 */}
      {reviewList && (
        <div ref={reviewRef} className="pt-10">
          <h3 className="text-xl font-bold">방문자 리뷰</h3>
          <div className="flex justify-between pt-1">
            <div className="flex items-center text-BLACK font-bold">
              <FaStar size={18} className="text-yellow-500 mx-1" />
              <p className="pr-2">{data.score}</p>
              <p className="text-[#919191] text-sm">
                {reviewList.totalElements}명의 평가
              </p>
            </div>
            <button
              className="text-MAIN_GREEN font-bold"
              onClick={() => {
                navigate(`/camps/${data.id}/reviews`);
                scrollToTop();
              }}
            >
              리뷰 보기
            </button>
          </div>
          {/* 로딩중 UI */}
          {isReviewsLoading && <Loading />}
          <div className="flex gap-5 py-2">
            {reviewList.content.map((review, index) => (
              <SimpleReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      )}

      {/* 캠핑장 운영정책 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold pb-2">캠핑장 운영정책</h3>

        {/* 아코디언 */}
        <div className="rounded-2xl border cursor-pointer">
          <div className="w-full">
            <div
              className="p-2 mx-3 flex justify-between border-b-[1px] cursor-pointer"
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
            <div ref={contentRef} className="p-4 whitespace-pre-line">
              {policy}
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
            <span className="text-[#393939] pl-1">{data.owner.nickName}</span>
          </p>
          <p className="pb-1">
            연락처 :{" "}
            <span className="text-[#393939] pl-1">
              {formatPhoneNumber(data.tel)}
            </span>
          </p>
          <p className="pb-1">
            상호명 :<span className="text-[#393939] pl-1">{data.facltNm}</span>
          </p>
          <p className="pb-1">
            사업자 주소 :
            <span className="text-[#393939] pl-1">
              {data.addr1} {data.addr2}
            </span>
          </p>
          <p className="pb-1">
            사업장 등록 번호 :
            <span className="text-[#393939] pl-1">{data.bizrno}</span>
          </p>
          <p className="pb-1">
            관광사업(야영장) 등록 번호 :
            <span className="text-[#393939] pl-1">{data.trsagntNo}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default InfoDetail;
