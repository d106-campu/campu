import { RootState } from "@/app/store";
import { setSelectedCampground } from "@/features/owner/OwnerSideSlice";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

interface SideTabbarProps {
  campgrounds: string[];
}

const SideTabbar: React.FC<SideTabbarProps> = ({ campgrounds }) => {
  const dispatch = useDispatch();
  const selectCampground = useSelector(
    (state: RootState) => state.ownerSide.selectedCampground
  );

  const [defaultCampground, setDefaultCampground] =
    useState<string>(campgrounds[0]);
  console.log(setDefaultCampground);
  useEffect(() => {
    dispatch(setSelectedCampground(defaultCampground));
  }, []);

  const handleSelect = (campground: string) => {
    dispatch(setSelectedCampground(campground));
  };

  return (
    <div>
      {campgrounds.map((campground, index) => (
        <button
          key={index}
          onClick={() => handleSelect(campground)}
          className={`${
            selectCampground === campground ? "bg-green-500" : "bg-white"
          } hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full`}
        >
          {campground}
        </button>
      ))}
    </div>
  );
};

export default SideTabbar;
