import React, { useState } from "react";

interface TagListProps {
  tags: string[];
  onTagToggle: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onTagToggle }) => {
  // 기본값 지정
  const [selectedTags, setSelectedTags] = useState<string[]>(["애견동반"]);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onTagToggle(tag);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-4 py-2 text-sm ${
            selectedTags.includes(tag)
              ? "bg-MAIN_GREEN text-white"
              : "bg-[#E1F9E3]"
          } rounded-3xl cursor-pointer`}
          onClick={() => toggleTag(tag)}
        >
          # {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
