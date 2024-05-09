import { useState } from "react";
import Camping from "@/assets/images/Camping.png";
import AutoCamping from "@/assets/images/AutoCamping.png";
import Glamping from "@/assets/images/Glamping.png";
import Caravane from "@/assets/images/Caravane.png";
import CampingSelect from "@/assets/images/CampingSelect.png";
import AutoCampingSelect from "@/assets/images/AutoCampingSelect.png";
import GlampingSelect from "@/assets/images/GlampingSelect.png";
import CaravaneSelect from "@/assets/images/CaravaneSelect.png";
import RecommendItem from "@/components/home/recommend/RecommendItem";
import { dayOfWeekend } from "@/utils/dayOfWeekend";
import { useCampsite } from "@/hooks/search/useCampsite";

const RecommendType = () => {
  const [selectedTab, setSelectedTab] = useState<string>("캠핑");
  const [showList, setShowList] = useState<boolean>(true);
  const { useCampsiteList } = useCampsite();

  // 주말 날짜
  const weekendDates = dayOfWeekend();
  const saturday = weekendDates.saturday;
  const sunday = weekendDates.sunday;

  // @TODO: 백엔드 완료되면 삭제
  const tabToInduty = (tab: string) => {
    switch (tab) {
      case "캠핑":
        return "camping";
      case "오토캠핑":
        return "autocamping";
      case "글램핑":
        return "glamping";
      case "카라반":
        return "caravan";
      default:
        throw new Error("Invalid tab name");
    }
  };
  const indutyValue = tabToInduty(selectedTab);

  // ( 주말 기준 ) 유형별 추천 캠핑장 리스트 조회
  // @TODO: 백엔드 구현 끝나면 유형 이름 수정해야함
  const { data: campsiteOfInduty } = useCampsiteList({
    startDate: saturday,
    endDate: sunday,
    headCnt: 2,
    induty: indutyValue,
    pageable: { page: 0, size: 6 },
  });

  const handleTabClick = (tab: string) => {
    if (["캠핑", "오토캠핑", "글램핑", "카라반"].includes(tab)) {
      setSelectedTab(tab);
      setShowList(true);
    }
  };

  const getSelectedImage = (tab: string): string => {
    switch (tab) {
      case "캠핑":
        return selectedTab === "캠핑" ? Camping : CampingSelect;
      case "오토캠핑":
        return selectedTab === "오토캠핑" ? AutoCamping : AutoCampingSelect;
      case "글램핑":
        return selectedTab === "글램핑" ? Glamping : GlampingSelect;
      case "카라반":
        return selectedTab === "카라반" ? Caravane : CaravaneSelect;
      default:
        throw new Error("Invalid tab type");
    }
  };

  return (
    <>
      <div className="bg-[#64CF5B]/20 text-center flex flex-col items-center py-4">
        <div className="font-bold text-2xl pt-6">
          <p>어떤 캠핑 스타일을 찾으시나요?</p>
        </div>

        {/* 캠핑 타입 */}
        <div className="flex justify-evenly w-[70%] p-3">
          {["캠핑", "오토캠핑", "글램핑", "카라반"].map((tab) => (
            <div
              key={tab}
              className="cursor-pointer p-3"
              onClick={() => handleTabClick(tab)}
            >
              <img src={getSelectedImage(tab)} className="w-28" />
              <p className="pt-2">{tab}</p>
            </div>
          ))}
        </div>
      </div>

      {showList && (
        <div className="flex justify-center py-8">
          <div className="flex flex-wrap justify-center w-[70%]">
            {campsiteOfInduty?.data.campsiteList.content.map((item) => (
              <RecommendItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendType;
