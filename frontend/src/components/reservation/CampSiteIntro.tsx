import { useState } from "react";
import CampingPhotos from "@/components/reservation/CampingPhotos";
import CampSiteLayout from "@/components/reservation//CampSiteLayout";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import phoneIcon from "@/assets/svg/phone.svg";
import reviewIcon from "@/assets/svg/review.svg";
import mapIcon from "@/assets/svg/map.svg";

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
  totalReview: 10,
  main: mainPhoto,
  other: [photo1, photo2, photo3, photo4, photo5],
  layout: layout,
  description: "🌳🌸 깔끔하고 분위기 좋은 신상 캠핑 숙소 🌸🌳",
  detailDescription: `프라이빗 캠프유캠푸 캠핑장 신규오픈 했어요! 경북 칠곡군 가산면 내에 위치하였고 피크닉과 캠핑을 선택하여 즐길 수 있도록 각각의 개별동으로 사이트를 만들어놓았습니다.
개별 사이크 내 바베큐존에서 호수의 낭만과 경치를 한번에 즐길 수 있는 힐링 캠핑공간입니다~`,
  location: "경상북도 구미시",
  thema: ["물놀이", "애견동반"],
};

const CampSiteIntro = () => {
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
