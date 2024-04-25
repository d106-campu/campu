import { useState } from "react";
import dummy from "@/assets/images/dummyCamping2.png";
import Camping from "@/assets/images/Camping.png";
import AutoCamping from "@/assets/images/AutoCamping.png";
import Glamping from "@/assets/images/Glamping.png";
import Caravane from "@/assets/images/Caravane.png";
import CampingSelect from "@/assets/images/CampingSelect.png";
import AutoCampingSelect from "@/assets/images/AutoCampingSelect.png";
import GlampingSelect from "@/assets/images/GlampingSelect.png";
import CaravaneSelect from "@/assets/images/CaravaneSelect.png";
import RecommendTypeItem from "./RecommendTypeItem";

const RecommendType = () => {
  type TabType = "캠핑" | "오토캠핑" | "글램핑" | "카라반";

  const [selectedTab, setSelectedTab] = useState<TabType>("캠핑");
  const [showList, setShowList] = useState<boolean>(true); // 선택된 탭에 따라 목록을 보여줄지 숨길지 결정
  const handleTabClick = (tab: TabType) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
    }
    setShowList(true);
  };
  const getSelectedImage = (tab: TabType) => {
    switch (tab) {
      case "캠핑":
        return selectedTab === "캠핑" ? CampingSelect : Camping;
      case "오토캠핑":
        return selectedTab === "오토캠핑" ? AutoCampingSelect : AutoCamping;
      case "글램핑":
        return selectedTab === "글램핑" ? GlampingSelect : Glamping;
      case "카라반":
        return selectedTab === "카라반" ? CaravaneSelect : Caravane;
      default:
        return;
    }
  };

  return (
    <>
      <div className="bg-[#64CF5B]/20 text-center flex flex-col items-center">
        <div className="font-bold text-2xl pt-6">
          <p>어떤 캠핑 스타일을 찾으시나요?</p>
        </div>

        {/* 캠핑 타입 */}
        <div className="flex justify-around w-[60%] p-3">
          {["캠핑", "오토캠핑", "글램핑", "카라반"].map((tab) => (
            <div
              key={tab}
              className="cursor-pointer p-3"
              onClick={() => handleTabClick(tab as TabType)}
            >
              <img src={getSelectedImage(tab as TabType)} className="w-28" />
              <p className="pt-2">{tab}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 탭에 따라 목록을 보여줄지 결정 */}
      {showList && (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center w-[60%]">
            {dummyData
              .filter((item) => item.type === selectedTab)
              .map((item) => (
                <RecommendTypeItem key={item.id} item={item} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendType;

const dummyData = [
  {
    id: 1,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 2,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 3,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 4,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
  {
    id: 5,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 6,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 7,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 8,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
  {
    id: 9,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 10,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 11,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 12,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
  {
    id: 13,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 14,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 15,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 16,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
  {
    id: 17,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 18,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 19,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 20,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
  {
    id: 21,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
  },
  {
    id: 22,
    name: "오토캠핑핑캠핑장",
    image: dummy,
    rating: 4.8,
    price: "40,000",
    description: "편안한 캠핑을 즐길 수 있는 곳",
    location: "강원도 춘천시",
    type: "오토캠핑",
  },
  {
    id: 23,
    name: "글램핑핑캠핑장",
    image: dummy,
    rating: 4.2,
    price: "80,000",
    description: "고급스러운 편안한 숙박이 가능한 글램핑장",
    location: "경기도 양평군",
    type: "글램핑",
  },
  {
    id: 24,
    name: "카라반핑캠핑장",
    image: dummy,
    rating: 4.0,
    price: "60,000",
    description: "도심 속에서 편안한 카라반 캠핑을 즐길 수 있는 장소",
    location: "서울특별시 강남구",
    type: "카라반",
  },
];
