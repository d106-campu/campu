import { RootState } from "@/app/store";
import { useReservation } from "@/hooks/reservation/useReservation";
import { createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface TagListProps {
  tags: string[];
  onTagToggle: (tag: string) => void;
}

const selectCampsiteInfo = createSelector(
    (state: RootState) => state.ownerSide.campsiteId,
    (state: RootState) => state.auth.isLogin,
    (campsiteId, isLogin) => ({ campsiteId, isLogin })
  );

const OwnerTagList: React.FC<TagListProps> = ({ tags, onTagToggle }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { campsiteId, isLogin } = useSelector(selectCampsiteInfo);
  const { useGetCampsite } = useReservation();
  const { data: detailCampsiteInfo } = useGetCampsite(campsiteId!, isLogin);
  console.log(detailCampsiteInfo?.data.campsite.themeList);

  useEffect(() => {
    if (detailCampsiteInfo && detailCampsiteInfo.data.campsite.themeList) {
      setSelectedTags(detailCampsiteInfo.data.campsite.themeList);
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
    onTagToggle(tag);
  };

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-4 py-2 text-xs ${
            selectedTags.includes(tag)
              ? "bg-MAIN_GREEN text-white"
              : "bg-[#E1F9E3]"
          } rounded-3xl cursor-pointer`}
          onClick={() => toggleTag(tag)}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default OwnerTagList;
