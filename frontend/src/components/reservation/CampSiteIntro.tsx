import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import CampingPhotos from "@/components/reservation/CampingPhotos";
import CampSiteLayout from "@/components/reservation//CampSiteLayout";
import Calendar from "@/components/@common/Calendar/Calendar";
import { formatSimpleDate } from "@/utils/formatDateTime";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import phoneIcon from "@/assets/svg/phone.svg";
import reviewIcon from "@/assets/svg/review.svg";
import mapIcon from "@/assets/svg/map.svg";

// @TODO: API 명세서 나오면 수정 필요
interface ICampSiteIntro {
  id: number;
  campsite_faclt_nm: string;
  campsite_tel: string;
  campsite_addr1: string;
  campsite_addr2: string;
  types: string[];
  isLiked: boolean;
  totalReview: number;
  main: string;
  other: string[];
  layout: string;
  description: string;
  detailDescription: string;
  location: string;
  thema: string[];
}

const CampSiteIntro = ({ data }: { data: ICampSiteIntro }) => {
  const [isLiked, setIsLiked] = useState<boolean>(data.isLiked);
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );
  return (
    <>
      <CampingPhotos main={data.main} photos={data.other} id={data.id} />
      {/* 캠핑장 유형 */}
      <div className="pt-7">
        {data.types.map((type, index) => (
          <span key={index} className="text-UNIMPORTANT_TEXT_01">
            {type}
            {index < data.types.length - 1 && (
              <span className="text-UNIMPORTANT_TEXT_01 p-1">·</span>
            )}
          </span>
        ))}
        {/* 캠핑장 이름 */}
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-3xl">{data.campsite_faclt_nm}</h1>
          {/* 좋아요 */}
          <button
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          >
            {isLiked ? (
              <VscHeartFilled size={38} color="#FF777E" />
            ) : (
              <VscHeart size={38} color="#e9e9e9" />
            )}
          </button>
        </div>

        {/* 캠핑장 필수 정보 */}
        {/* @TODO: 클릭 시 이동 */}
        <div className="p-2 text-sm">
          <div className="flex pt-1">
            <img src={mapIcon} className="w-5" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-2">
              {data.campsite_addr1}
            </p>
            <p className="pl-2 text-MAIN_GREEN font-bold">지도로 확인하기</p>
          </div>
          <div className="flex py-2">
            <img src={phoneIcon} className="w-4" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-3">{data.campsite_tel}</p>
            <p className="pl-2 text-MAIN_GREEN font-bold">전화하기</p>
          </div>
          <div className="flex">
            <img src={reviewIcon} className="w-5" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-2">
              방문자 리뷰 <span className="font-bold">{data.totalReview}</span>
              개
            </p>
            <p className="pl-2 text-MAIN_GREEN font-bold">둘러보기</p>
          </div>
        </div>

        {/* 캠핑장 소개 */}
        <div className="pt-10">
          <h3 className="text-xl font-bold">캠핑장 소개</h3>
          <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
            <p className="font-bold pb-1">{data.description}</p>
            <p className="pl-1 pb-2 whitespace-pre">{data.detailDescription}</p>
            {data.thema &&
              data.thema.map((tag, index) => (
                <span
                  key={index}
                  className="font-medium text-MAIN_GREEN pl-1 pr-3"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>

        <div className="pt-10 flex justify-between">
          {/* 캠핑존 배치도 */}
          <CampSiteLayout
            layout={data.layout}
            campsite_name={data.campsite_faclt_nm}
          />
          {/* 캘린더 */}
          <div className="w-[50%] h-[420px]">
            <div className="flex justify-around items-stretch border-2 rounded-xl border-[#C9C9C9] text-BLACK text-center font-bold w-[75%] mx-auto">
              <div className="flex-1 my-auto py-1 rounded-xl">
                <p className="text-sm text-MAIN_GREEN">입실일</p>
                {formatSimpleDate(startDate) || (
                  <p className="text-sm">날짜를 선택해주세요</p>
                )}
              </div>
              <div className="border-l-2 border-[#C9C9C9] mx-2" />
              <div className="flex-1 my-auto py-1 rounded-xl">
                <p className="text-sm text-MAIN_GREEN">퇴실일</p>
                {formatSimpleDate(endDate) || (
                  <p className="text-sm">날짜를 선택해주세요</p>
                )}
              </div>
            </div>
            <Calendar readOnly={true} />
          </div>
        </div>
      </div>
    </>
  );
};
export default CampSiteIntro;
