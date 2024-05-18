import { useEffect, useState } from "react";
import FacilityList from "@/components/owner/ownerManage/ownerManageInfo/FacilityList";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useReservation } from "@/hooks/reservation/useReservation";
import OwnerTagList from "./OwnerTagList";
import { createSelector } from "@reduxjs/toolkit";
import { IEditDetailReq } from "@/types/owner";
import { useOwner } from "@/hooks/owner/useOwner";

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
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]); // 시설 선택
  const { campsiteId, isLogin } = useSelector(selectCampsiteInfo);
  const { useGetCampsite } = useReservation();
  const { data: detailCampsiteInfo } = useGetCampsite(campsiteId!, isLogin);
  const [detailIntro, setDetailIntro] = useState<string>("");

  useEffect(() => {
    if (detailCampsiteInfo && detailCampsiteInfo.data.campsite.facltList) {
      setSelectedFacility(detailCampsiteInfo.data.campsite.facltList);
      setDetailIntro(detailCampsiteInfo?.data.campsite.intro);
      setSelectedTags(detailCampsiteInfo?.data.campsite.themeList);
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

  const createRequestDto: IEditDetailReq = {
    campsiteId: campsiteId!,
    intro: detailIntro,
    themeList: selectedTags,
    fcltyList: selectedFacility,
  };

  const { useUpdateDetail } = useOwner();
  const { mutate } = useUpdateDetail(createRequestDto);

  const handleSubmit = () => {
    // console.log("시설", selectedFacility);
    // console.log("소개", detailIntro);
    if (campsiteId) {
      mutate();
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
              <div className="flex items-center justify-between pb-3">
                <p>한줄 소개</p>
                <p className="px-4 text-xs text-gray-500">
                  한줄 소개는 수정이 불가능합니다.
                </p>
              </div>
              <textarea
                className="w-full h-30 p-4 border rounded-md outline-none focus:ring-0 focus:border-gray-500"
                value={detailCampsiteInfo?.data.campsite.lineIntro}
                readOnly
              />
            </div>
            {/* 한줄 소개 */}
            <div>
              <p className="py-3">소개</p>
              <textarea
                className="w-full h-30 p-4 border rounded-md outline-none focus:ring-0 focus:border-gray-500"
                placeholder="캠핑장에 대한 자세한 소개글을 작성해주세요."
                value={detailIntro}
                onChange={(e) => setDetailIntro(e.target.value)}
              />
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
          <button
            onClick={handleSubmit}
            className="bg-MAIN_GREEN text-white px-4 py-2 rounded-md"
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
};

export default OwnerManageInfo;
