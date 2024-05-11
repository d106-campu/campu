import { RootState } from "@/app/store";
import KakaoMap from "@/components/@common/Map/KakaoMap";
import SearchSection from "@/components/search/searchSection/SearchSection";
import { useSelector } from "react-redux";

const SearchContainer = () => {
  const locations = useSelector(
    (state: RootState) => state.campingMap.campsiteData
  );

  const mapLocations = locations?.map((campsite) => ({
    facltNm: campsite.facltNm,
    rate: campsite.score,
    lat: campsite.campsiteLocation?.mapY || null,
    lng: campsite.campsiteLocation?.mapX || null,
  }));

  return (
    <>
      <div className="flex">
        <div className="w-[40%]">
          <div className="px-4 py-2">
            <SearchSection />
          </div>
        </div>
        <div className="h-[calc(100vh-3rem)] w-[60%]">
          <KakaoMap locations={mapLocations!} />
        </div>
      </div>
    </>
  );
};

export default SearchContainer;
