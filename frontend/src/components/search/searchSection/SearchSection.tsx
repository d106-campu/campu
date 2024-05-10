import SearchBar from "@/components/home/SearchBar";
import { ICampingGround } from "@/types/search";
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
    doNm: searchBarState.region || undefined,
    sigunguNm: searchBarState.subRegion || undefined,
    startDate: startday,
    endDate: endday,
    headCnt: headcnt,
    pageable: { page: 0, size: 1000 },
  });

  console.log(campsiteOfSearch?.data.campsiteList);

  const addDummyDataToStore = () => {
    dispatch(addCampingData(dummy));
  };

  useEffect(() => {
    addDummyDataToStore();
  }, []);

  return (
    <>
      <div className="w-full">
        <SearchBar />
      </div>
      <div>
        {dummy.length === 0 ? (
          <SearchNoResult />
        ) : (
          dummy.map((camping: ICampingGround) => (
            <SearchCampingItem key={camping.id} camping={camping} />
          ))
        )}
      </div>
    </>
  );
};

export default SearchSection;

const dummy: ICampingGround[] = [
  {
    id: 1,
    facltNm: "구미 캠핑장",
    lineIntro: "구미시 낙동강에 위치한 인기 캠핑장",
    doNm: "경상북도",
    sigunguNm: "구미시",
    addr1: "경북 구미시 양호동 614-1",
    addr2: null,
    price: 150000,
    rate: 4.8,
    mapX: 36.1334375,
    mapY: 128.3710625,
    like: 12,
    available: true,
    thumbnailImageUrl:
      "https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg",
  },
  {
    id: 2,
    facltNm: "칠곡보 캠핑장",
    lineIntro: "대구 구미 근교의 한적하고 조용한 인기 오토캠핑",
    doNm: "경상북도",
    sigunguNm: "구미시",
    addr1: "경북 칠곡군 약목면 강변서로 110-43",
    addr2: null,
    price: 120000,
    rate: 4.9,
    mapX: 36.0212083,
    mapY: 128.3952645,
    like: 12,
    available: false,
    thumbnailImageUrl:
      "https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg",
  },
];
