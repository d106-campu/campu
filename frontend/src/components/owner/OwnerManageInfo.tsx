import { useState } from "react";
import TagList from "@/components/home/TagList";
import DummyInfo from "@/assets/images/CampingInfo.png";

const OwnerManageInfo = () => {
  const tags = [
    "애견동반",
    "힐링캠핑",
    "야경명소",
    "물놀이",
    "매너타임",
    "노키즈",
    "장비대여",
    "장박가능",
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const campingTypes = ["캠핑", "글램핑", "오토캠핑", "카라반"];

  const [selectedCampingType, setSelectedCampingType] = useState<string | null>(
    null
  );

  const toggleCampingType = (campingType: string) => {
    setSelectedCampingType(
      campingType === selectedCampingType ? null : campingType
    );
  };

  return (
    <>
      <div>
        <div className="flex flex-col p-4">
          <p className="font-semibold">캠핑장 정보 수정</p>
          <div className="text-sm px-2 py-4">
            {/* 한줄 소개 */}
            <div>
              <p className="pb-3">한줄 소개</p>
              <textarea
                className="w-full h-30 p-4 border rounded-md outline-none"
                placeholder="캠핑장에 대한 간단한 소개글을 작성해주세요."
              />
            </div>
            {/* 한줄 소개 */}
            <div>
              <p className="py-3">소개</p>
              <textarea
                className="w-full h-30 p-4 border rounded-md outline-none"
                placeholder="캠핑장에 대한 자세한 소개글을 작성해주세요."
              />
            </div>
            {/* 캠핑장 유형 */}
            <div>
              <p className="py-3">캠핑장 유형</p>
              <div className="flex space-x-2 p-2">
                {campingTypes.map((type) => (
                  <div
                    key={type}
                    className={`${
                      selectedCampingType === type
                        ? "bg-MAIN_GREEN text-white"
                        : "border border-gray-200 text-gray-500"
                    } px-4 py-2 rounded-xl`}
                    onClick={() => toggleCampingType(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
            {/* 캠핑장 테마 */}
            <div>
              <p className="py-3">캠핑장 테마</p>
              <div>
                <TagList tags={tags} onTagToggle={toggleTag} />
              </div>
            </div>
            {/* 시설 및 레저 */}
            {/* @TODO: 실제 데이터로 변경해야함 */}
            <div>
              <p className="py-3">시설 및 레저</p>
              <div className="border border-gray-200 p-4 rounded-md flex justify-center">
                <img src={DummyInfo} />
              </div>
            </div>
          </div>
        </div>
        {/* post 버튼 */}
        <div className="flex justify-end p-4 text-sm">
          <button className="bg-gray-300 px-4 py-2 rounded-md">저장하기</button>
        </div>
      </div>
    </>
  );
};

export default OwnerManageInfo;
