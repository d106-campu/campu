import { useState } from "react";
import TagList from "@/components/home/TagList";
import { dayOfWeekend } from "@/utils/dayOfWeekend";
import { useCampsite } from "@/hooks/search/useCampsite";
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

  const [selectedTags, setSelectedTags] = useState<string>("여름물놀이");
  const { useCampsiteList } = useCampsite();

  // 주말 날짜
  const weekendDates = dayOfWeekend();
  const saturday = weekendDates.saturday;
  const sunday = weekendDates.sunday;

  // ( 주말 기준 ) 테마별 추천 캠핑장 리스트 조회
  const { data: campsiteOfThema } = useCampsiteList({
    startDate: saturday,
    endDate: sunday,
    headCnt: 2,
    theme: selectedTags,
    pageable: { page: 0, size: 6 },
  });

  const toggleTag = (tag: string) => {
    if (selectedTags === tag) {
      setSelectedTags("");
    } else {
      setSelectedTags(tag);
    }
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
          {campsiteOfThema?.data.campsiteList.content.map((item) => (
            <RecommendItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendThema;
