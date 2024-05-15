import { useEffect, useState } from "react";
import FacilityList from "@/components/owner/ownerManage/ownerManageInfo/FacilityList";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useReservation } from "@/hooks/reservation/useReservation";
import OwnerTagList from "./OwnerTagList";
import { createSelector } from "@reduxjs/toolkit";

const selectCampsiteInfo = createSelector(
  (state: RootState) => state.ownerSide.campsiteId,
  (state: RootState) => state.auth.isLogin,
  (campsiteId, isLogin) => ({ campsiteId, isLogin })
);

const OwnerManageInfo = () => {
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

  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 테마 선택
  const [selectedCampingType, setSelectedCampingType] = useState<
    string[] | null
  >(null); // 캠핑장 유형 선택
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]); // 시설 선택
  const { campsiteId, isLogin } = useSelector(selectCampsiteInfo);
  const { useGetCampsite } = useReservation();
  const { data: detailCampsiteInfo } = useGetCampsite(campsiteId!, isLogin);

  useEffect(() => {
    if (detailCampsiteInfo && detailCampsiteInfo.data.campsite.indutyList) {
      setSelectedCampingType(detailCampsiteInfo.data.campsite.indutyList);
    }
  }, [detailCampsiteInfo]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleFacility = (facility: string) => {
    if (selectedFacility.includes(facility)) {
      setSelectedFacility(selectedFacility.filter((i) => i !== facility));
    } else {
      setSelectedFacility([...selectedFacility, facility]);
    }
  };

  const campingTypes = ["캠핑", "글램핑", "자동차야영장", "카라반"];

  const toggleCampingType = (campingType: string) => {
    if (selectedCampingType && selectedCampingType.includes(campingType)) {
      setSelectedCampingType(
        selectedCampingType.filter((type) => type !== campingType)
      );
    } else {
      setSelectedCampingType(
        selectedCampingType
          ? [...selectedCampingType, campingType]
          : [campingType]
      );
    }
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
                value={detailCampsiteInfo?.data.campsite.lineIntro}
              />
            </div>
            {/* 한줄 소개 */}
            <div>
              <p className="py-3">소개</p>
              <textarea
                className="w-full h-30 p-4 border rounded-md outline-none"
                placeholder="캠핑장에 대한 자세한 소개글을 작성해주세요."
                value={detailCampsiteInfo?.data.campsite.intro}
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
                      selectedCampingType && selectedCampingType.includes(type)
                        ? " text-MAIN_GREEN border border-MAIN_GREEN"
                        : "border border-gray-200 text-gray-400"
                    } px-4 py-2 rounded-xl cursor-pointer`}
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
              <div className="pb-3">
                <OwnerTagList tags={tags} onTagToggle={toggleTag} />
              </div>
            </div>
            {/* 시설 및 레저 */}
            <div>
              <p className="py-3">시설 및 레저</p>
              <div className="border border-gray-200 p-4 rounded-md flex justify-center">
                <FacilityList
                  selectedFacility={selectedFacility}
                  onFacilityToggle={toggleFacility}
                />
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
