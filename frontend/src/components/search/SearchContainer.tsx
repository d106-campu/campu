import KakaoMap from "@/components/@common/Map/KakaoMap";
import SearchSection from "@/components/search/searchSection/SearchSection";

const SearchContainer = () => {
  const locations = [
    { mapX: 37.8, mapY: 127.5, facltNm: "캠프유캠푸 캠핑장", rate: 4.8 },
    { mapX: 37.8, mapY: 127.6, facltNm: "최먼지의 캠핑장", rate: 4.5 },
  ];

  const formattedLocations = locations.map((location) => ({
    lat: location.mapX,
    lng: location.mapY,
    facltNm: location.facltNm,
    rate: location.rate,
  }));

  return (
    <>
      <div className="flex">
        <div className="w-[40%]">
          {/* @TODO: CSS처리를 위한 BACKGROUND 추가 (추후 제거 예정) */}
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
