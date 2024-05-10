import React, { useState } from "react";

interface TagListProps {
  tags: string[];
  onTagToggle: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onTagToggle }) => {
  const [selectedTag, setSelectedTag] = useState<string>("여름물놀이");

  const toggleTag = (tag: string) => {
    setSelectedTag(tag);
    onTagToggle(tag);
  };

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-4 py-2 text-xs ${
            selectedTag === tag ? "bg-MAIN_GREEN text-white" : "bg-[#E1F9E3]"
          } rounded-3xl cursor-pointer`}
          onClick={() => toggleTag(tag)}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
