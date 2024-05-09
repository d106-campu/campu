import { useState } from "react";
import TagList from "@/components/home/TagList";
import { useCampsite } from "@/hooks/search/useCampsite";
import { dayOfWeekend } from "@/utils/dayOfWeekend";
import RecommendItem from "./RecommendItem";

const RecommendThema = () => {
  const tags = [
    "여름물놀이",
    "걷기길",
    "액티비티",
    "봄꽃여행",
    "가을단풍명소",
    "겨울눈꽃명소",
    "일몰명소",
    "일출명소",
    "수상레저",
    "낚시",
    "항공레저",
    "스키",
  ];

  const [selectedTag, setSelectedTag] = useState<string>("여름물놀이");
  const { useCampsiteList } = useCampsite();

  // @TODO: 백엔드 완료되면 삭제
  const tabToThema = (tab: string) => {
    switch (tab) {
      case "여름물놀이":
        return "summer";
      case "걷기길":
        return "trail";
      case "액티비티":
        return "activity";
      case "봄꽃여행":
        return "spring";
      case "가을단풍명소":
        return "autumn";
      case "겨울눈꽃명소":
        return "winter";
      case "일몰명소":
        return "sunset";
      case "일출명소":
        return "sunrise";
      case "수상레저":
        return "watersports";
      case "낚시":
        return "fishing";
      case "항공레저":
        return "airsports";
      case "스키":
        return "skiing";
      default:
        throw new Error("Invalid tab name");
    }
  };

  const themaValue = tabToThema(selectedTag);

  // 주말 날짜
  const weekendDates = dayOfWeekend();
  const saturday = weekendDates.saturday;
  const sunday = weekendDates.sunday;

  // ( 주말 기준 ) 테마별 추천 캠핑장 리스트 조회
  // @TODO: 백엔드 구현 끝나면 유형 이름 수정해야함
  const { data: campsiteOfThema } = useCampsiteList({
    startDate: saturday,
    endDate: sunday,
    headCnt: 2,
    theme: themaValue,
    pageable: { page: 0, size: 6 },
  });

  console.log(campsiteOfThema?.data.campsiteList.content);

  const toggleTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <>
      <div className="text-center flex flex-col items-center">
        <div className="w-[70%] pt-2">
          <p className="font-bold text-2xl py-4">
            테마별 인기 캠핑장 한 눈에 보기
          </p>
          <TagList tags={tags} onTagToggle={toggleTag} />
        </div>
      </div>
      <div className="flex justify-center py-8">
        <div className="flex flex-wrap justify-center w-[70%]">
          {campsiteOfThema?.data.campsiteList.content.map((campground) => (
            <RecommendItem key={campground.id} item={campground} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendThema;
