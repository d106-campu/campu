import { useState } from "react";
import { IRegion } from "@/components//@common/Search/RegionList";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setRegion, setSubRegion } from "@/features/search/searchBarSlice";
import { RootState } from "@/app/store";

const SearchRegion = ({ list }: { list: IRegion[] }) => {
  const [selectRegion, setSelectRegion] = useState<IRegion | null>(null);
  const [selectSubRegion, setSelectSubRegion] = useState<string | null>(null);
  const [isRegionListOpen, setIsRegionListOpen] = useState<boolean>(false);
  const [isSubRegionListOpen, setIsSubRegionListOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const searchBarState = useSelector((state: RootState) => state.searchBar);

  const handleRegionClick = (region: IRegion) => {
    if (selectRegion === region) {
      setIsRegionListOpen(!isRegionListOpen);
      dispatch(setRegion(region.name)); // 리덕스 스토어에 저장
      dispatch(setSubRegion(region.subArea[0])); // 기본 첫번째 서브지역 저장
    } else {
      setSelectRegion(region);
      setSelectSubRegion(null);
      setIsRegionListOpen(false);
    }
  };

  const handleSubRegionClick = (subRegion: string) => {
    dispatch(setSubRegion(subRegion)); // 리덕스 스토어에 저장
    setSelectSubRegion(subRegion);
    setIsRegionListOpen(false);
    setIsSubRegionListOpen(false);
  };

  return (
    <div className="flex text-xs">
      <button
        type="button"
        className="relative bg-white p-2 flex items-center"
        onClick={() => setIsRegionListOpen(!isRegionListOpen)}
      >
        <span className="pr-2 whitespace-nowrap">
          {searchBarState.region ? searchBarState.region : "지역 선택"}
        </span>
        <IoIosArrowDown />
      </button>

      <div className="absolute mt-10 z-20">
        {isRegionListOpen && (
          <ul className="max-h-64 w-32 overflow-auto bg-white py-2 text-sm">
            {list.map((region, index) => (
              <li
                key={index}
                className={`py-2 text-center cursor-pointer ${
                  selectRegion === region
                    ? "bg-SUB_GREEN_01 text-MAIN_GREEN"
                    : "text-gray-900 bg-white"
                }`}
                onClick={() => handleRegionClick(region)}
                onMouseEnter={() => setSelectRegion(region)}
                onMouseLeave={() => setSelectRegion(null)}
              >
                <span>{region.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 시군구 선택 */}
      {searchBarState.region && (
        <div>
          <button
            type="button"
            className="relative bg-white py-2 flex items-center"
            onClick={() => setIsSubRegionListOpen(!isSubRegionListOpen)}
          >
            <span className="pr-2 whitespace-nowrap">
              {searchBarState.subRegion
                ? searchBarState.subRegion
                : selectRegion!.subArea[0]}
            </span>
            <IoIosArrowDown />
          </button>
          <div className="absolute mt-1 w-64 z-20">
            {isSubRegionListOpen && (
              <ul className="max-h-64 w-32 overflow-auto bg-white py-2 text-sm">
                {selectRegion!.subArea.map((subRegion, index) => (
                  <li
                    key={index}
                    className={`py-2 text-center cursor-pointer ${
                      selectSubRegion === subRegion
                        ? "bg-SUB_GREEN_01 text-MAIN_GREEN"
                        : "text-gray-900 bg-white"
                    }`}
                    onClick={() => handleSubRegionClick(subRegion)}
                    onMouseEnter={() => setSelectSubRegion(subRegion)}
                    onMouseLeave={() => setSelectSubRegion(null)}
                  >
                    <span>{subRegion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRegion;
