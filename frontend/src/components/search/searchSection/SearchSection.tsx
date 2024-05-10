import SearchBar from "@/components/home/SearchBar";
import { ICampsiteSimpleRes } from "@/types/search";
import SearchCampingItem from "./SearchCampingItem";
import { useDispatch, useSelector } from "react-redux";
import { addCampingData } from "@/features/search/campingMapSlice";
import { useEffect } from "react";
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

  console.log(campsiteOfSearch?.data.campsiteList);

  useEffect(() => {
    if (campsiteOfSearch) {
      dispatch(addCampingData(campsiteOfSearch.data.campsiteList.content));
    }
  }, [campsiteOfSearch]);

  return (
    <>
      <div className="w-full">
        <SearchBar />
      </div>
      <div>
        {campsiteOfSearch?.data.campsiteList.content.length === 0 ? (
          <SearchNoResult />
        ) : (
          campsiteOfSearch?.data.campsiteList.content.map(
            (camping: ICampsiteSimpleRes) => (
              <SearchCampingItem key={camping.id} camping={camping} />
            )
          )
        )}
      </div>
    </>
  );
};

export default SearchSection;

