import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRefs } from "@/context/RefContext";
import { scrollToTop } from "@/utils/scrollToTop";
import { IReviewList } from "@/types/review";
import FacilityList from "@/components/reservation/FacilityList";
import ReviewItem from "@/components/reservation/ReviewItem";
import Loading from "@/components/@common/Loading/Loading";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

// @TODO: API 명세서 나오면 수정 필요
interface IData {
  id: number;
  checkIn: string;
  checkOut: string;
  mannerTime: string;
  rating: number;
  totalReview: number;
  owner: {
    name: string;
    campSite: string;
    adress: string;
    email: string;
    businessNumber: string;
    industryNumber: string;
  };
  policy?: string;
  facltList: string[];
  animalCmgCl?: boolean; // 애완동물 반입 여부
}

interface IInfoDetailProps {
  data: IData;
  reviewList: IReviewList | null;
  isLoading: boolean;
  campsiteId: number;
}

const InfoDetail = ({
  data,
  reviewList,
  isLoading,
  campsiteId,
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
      <div className="pt-10">
        <h3 className="text-xl font-bold">시설 및 레저</h3>
        <FacilityList facilities={data.facltList} pet={data.animalCmgCl} />
      </div>

      {/* 방문자 리뷰 */}
      {reviewList && reviewList.content.length > 0 && (
        <div ref={reviewRef} className="pt-10">
          <h3 className="text-xl font-bold">방문자 리뷰</h3>
          <div className="flex justify-between pt-1">
            <div className="flex items-center text-BLACK font-bold">
              <FaStar size={18} className="text-yellow-500 mx-1" />
              <p className="pr-2">{data.rating}</p>
              <p className="text-[#919191] text-sm">
                {reviewList.totalElements}명의 평가
              </p>
            </div>
            <button
              className="text-MAIN_GREEN font-bold"
              onClick={() => {
                navigate(`/camps/${campsiteId}/reviews`);
                scrollToTop();
              }}
            >
              리뷰 보기
            </button>
          </div>
          {/* 로딩중 UI */}
          {isLoading && <Loading />}
          <div className="flex gap-5 py-2">
            {reviewList.content.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      )}

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
            <div ref={contentRef} className="p-4 whitespace-pre-line">
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
