import SearchBar from "@/components/home/SearchBar";
import { ICampsiteSimpleRes } from "@/types/search";
import SearchCampingItem from "./SearchCampingItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampingData,
  addMapXData,
  addMapYData,
} from "@/features/search/campingMapSlice";
import { useEffect, useRef, useState } from "react";
import SearchNoResult from "./SearchNoResult";
import { useCampsite } from "@/hooks/search/useCampsite";
import { RootState } from "@/app/store";
import { dayOfWeekend } from "@/utils/dayOfWeekend";

const SearchSection = () => {
  const { useCampsiteList } = useCampsite();
  const dispatch = useDispatch();
  const searchBarState = useSelector((state: RootState) => state.searchBar);

  // 디폴트 값들 지정
  const weekendDates = dayOfWeekend();
  const startday = searchBarState.startDate || weekendDates.saturday;
  const endday = searchBarState.endDate || weekendDates.sunday;
  const headcnt = searchBarState.numberOfPeople || 2;

  //  캠핑장 리스트 조회
  const { data: campsiteOfSearch } = useCampsiteList({
    doNm: searchBarState.region || null,
    sigunguNm: searchBarState.subRegion || null,
    startDate: startday,
    endDate: endday,
    headCnt: headcnt,
    pageable: { page: 0, size: 1000 },
  });

  // 테스트
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (campsiteOfSearch) {
      dispatch(addCampingData(campsiteOfSearch.data.campsiteList.content));
      if (campsiteOfSearch.data.mapCoordinates) {
        dispatch(addMapXData(campsiteOfSearch.data.mapCoordinates.center.mapX));
        dispatch(addMapYData(campsiteOfSearch.data.mapCoordinates.center.mapY));
      }
    }
  }, [campsiteOfSearch]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 124 * selectedIndex,
      behavior: "smooth",
    });
  }, [selectedIndex]);

  return (
    <>
      <div>
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="h-[calc(100vh-10rem)] overflow-auto" ref={containerRef}>
          {campsiteOfSearch?.data.campsiteList.content.length === 0 ? (
            <SearchNoResult />
          ) : (
            campsiteOfSearch?.data.campsiteList.content
              .filter((camping: ICampsiteSimpleRes) => {
                // 검색 키워드가 있는 경우
                if (searchBarState.keyword) {
                  return camping.facltNm.includes(searchBarState.keyword);
                } else {
                  // 검색 키워드가 없는 경우 전체 리스트
                  return true;
                }
              })
              .map((camping: ICampsiteSimpleRes, index: number) => (
                <SearchCampingItem
                  key={camping.id}
                  camping={camping}
                  index={index}
                  selected={setSelectedIndex}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchSection;
