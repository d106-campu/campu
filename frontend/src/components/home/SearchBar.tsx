import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import SearchRegion from "@/components/@common/Search/SearchRegion";
import { RegionList } from "@/components/@common/Search/RegionList";

const SearchBar = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        {/* 지역 선택 */}
        <div className="flex items-center flex-grow border bg-white rounded-md p-3 max-h-11">
          <RiMapPinLine />
          <SearchRegion arr={RegionList} />
        </div>

        {/* 날짜 선택 */}
        <div className="flex items-center flex-grow border bg-white rounded-md p-3 max-h-11">
          <FaRegCalendarAlt />
          <select className="rounded-md ml-2 outline-none text-sm">
            <option>날짜 선택하기</option>
          </select>
        </div>

        {/* 인원 선택 */}
        <div className="flex items-center flex-grow border bg-white rounded-md p-3 max-h-11">
          <MdOutlinePersonOutline />
          <select className="rounded-md ml-2 outline-none text-sm">
            <option>인원 선택하기</option>
          </select>
        </div>
      </div>

      {/* 검색어 입력 */}
      <div className="flex mt-2 items-center">
        <div className="flex w-full items-center border bg-white rounded-md p-3 max-h-11">
          <LuSearch />
          <input
            className="ml-2 outline-none placeholder-black text-sm"
            placeholder="키워드로 캠핑장을 검색해보세요"
          ></input>
        </div>
        {/* 검색버튼 */}
        <button className="ml-2 px-6 py-3 bg-[#186D41] text-white rounded-md text-sm whitespace-nowrap">
          검색하기
        </button>
      </div>
    </>
  );
};

export default SearchBar;
