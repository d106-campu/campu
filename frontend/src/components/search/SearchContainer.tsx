import { RootState } from "@/app/store";
import KakaoMap from "@/components/@common/Map/KakaoMap";
import SearchSection from "@/components/search/searchSection/SearchSection";
import { useSelector } from "react-redux";

const SearchContainer = () => {
  // 스토어에 저장된 캠핑장 목록 불러옴
  const locations = useSelector(
    (state: RootState) => state.campingMap.campingData
  );
  // 지도에 띄울 필요한 정보만 추출
  const formattedLocations = locations.map((location) => ({
    lat: location.mapX,
    lng: location.mapY,
    facltNm: location.facltNm,
    rate: location.rate,
  }));

  console.log(formattedLocations);

  return (
    <>
      <div className="flex">
        <div className="w-[40%]">
          <div className="px-4 py-2">
            <SearchSection />
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)] w-[60%]">
          <KakaoMap locations={formattedLocations} />
        </div>
      </div>
    </>
  );
};

export default SearchContainer;