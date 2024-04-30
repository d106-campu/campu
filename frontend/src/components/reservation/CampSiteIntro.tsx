import { useState } from "react";
import CampingPhotos from "@/components/reservation/CampingPhotos";
import CampSiteLayout from "@/components/reservation//CampSiteLayout";
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
  return (
    <>
      <CampingPhotos main={data.main} photos={data.other} />
      <div className="pt-7">
        {data.types.map((type, index) => (
          <span key={index} className="text-UNIMPORTANT_TEXT_01">
            {type}
            {index < data.types.length - 1 && (
              <span className="text-UNIMPORTANT_TEXT_01 p-1">·</span>
            )}
          </span>
        ))}
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-3xl">{data.campsite_faclt_nm}</h1>
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

        <div className="pt-10 flex">
          {/* 캠핑존 배치도 */}
          <CampSiteLayout
            layout={data.layout}
            campsite_name={data.campsite_faclt_nm}
          />
        </div>
      </div>
    </>
  );
};
export default CampSiteIntro;
