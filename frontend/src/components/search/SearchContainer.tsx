import KakaoMap from "@/components/@common/Map/KakaoMap";
import SearchSection from "@/components/search/searchSection/SearchSection";

const SearchContainer = () => {
  const lat = 36.10712766037178;
  const lng = 128.41690255979233;

  return (
    <>
      <div className="flex">
        <div className="w-[40%]">
          {/* @TODO: CSS처리를 위한 BACKGROUND 추가 (추후 제거 예정) */}
          <div className="px-4 py-2 bg-gray-200">
            <SearchSection />
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)] w-[60%]">
          <KakaoMap lat={lat} lng={lng} />
        </div>
      </div>
    </>
  );
};

export default SearchContainer;
