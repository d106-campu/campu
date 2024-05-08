import { useState } from "react";
import TagList from "@/components/home/TagList";
import RecommendItem from "@/components/home/recommend/RecommendItem";
import dummy from "@/assets/images/dummyCamping3.png";

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

  const [selectedTags, setSelectedTags] = useState<string[]>(["여름물놀이"]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
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
          {dummyData.map((campground) => {
            const matchesSelectedTags = campground.thema.some((theme) =>
              selectedTags.includes(theme)
            );
            if (matchesSelectedTags) {
              return <RecommendItem key={campground.id} item={campground} />;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default RecommendThema;

// 더미데이터
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
    thema: ["물놀이", "애견동반"],
  },
  {
    id: 2,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["야경명소", "애견동반"],
  },
  {
    id: 3,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["야경명소", "장비대여"],
  },
  {
    id: 4,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["물놀이", "애견동반"],
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
    thema: ["야경명소", "애견동반"],
  },
  {
    id: 6,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["야경명소", "장비대여"],
  },
  {
    id: 7,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["물놀이", "애견동반"],
  },
  {
    id: 8,
    name: "캠핑핑캠핑장",
    image: dummy,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
    type: "캠핑",
    thema: ["야경명소", "애견동반"],
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
    thema: ["야경명소", "장비대여"],
  },
];
