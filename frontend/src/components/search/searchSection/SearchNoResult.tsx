import { noResultOptions } from "@/assets/lotties/lottieOptions";
import Lottie from "react-lottie";

const SearchNoResult = () => {
  return (
    <>
      <div className="text-center text-sm text-MAIN_GREEN pt-24">
        <Lottie
          options={noResultOptions}
          height={120}
          width={200}
          speed={0.5}
        />
        <p className="text-lg py-2 font-bold">검색 결과가 없습니다 😥</p>
        <div className="text-gray-500">
          <p>명확한 검색 결과를 위해</p>
          <p>지역과 날짜를 선택해주세요</p>
        </div>
      </div>
    </>
  );
};

export default SearchNoResult;
