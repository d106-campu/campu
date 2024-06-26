import { useEffect, useState } from "react";
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

  useEffect(() => {
    // 전체 조회 방지를 위한 디폴트 지역/ 서브지역 (서울시 강동구) 저장
    if (searchBarState.region && searchBarState.subRegion) {
      const defaultRegion = list.find(
        (region) => region.name === searchBarState.region
      );
      if (defaultRegion) {
        setSelectRegion(defaultRegion);
        setSelectSubRegion(searchBarState.subRegion);
      }
    }
  }, [searchBarState.region, searchBarState.subRegion, list]);

  const handleRegionClick = (region: IRegion) => {
    if (selectRegion === region) {
      setIsRegionListOpen(!isRegionListOpen);
      dispatch(setRegion(region.name));
      dispatch(setSubRegion(region.subArea[0]));
    } else {
      setSelectRegion(region);
      setSelectSubRegion(null);
      setIsRegionListOpen(false);
    }
  };

  const handleSubRegionClick = (subRegion: string) => {
    dispatch(setSubRegion(subRegion));
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
      {/* Subregion selection */}
      {searchBarState.region && selectRegion && (
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
