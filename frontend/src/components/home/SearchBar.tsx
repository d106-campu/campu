import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import SearchRegion from "@/components/@common/Search/SearchRegion";
import { RegionList } from "@/components/@common/Search/RegionList";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/app/store";
import { formatSimpleDate } from "@/utils/formatDateTime";

const SearchBar = ({ state }: { state?: string }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const searchBarState = useSelector((state: RootState) => state.searchBar);
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  // 인원 증감 함수
  const handleDecrease = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };
  const handleIncrease = () => {
    if (numberOfPeople < 6) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const goToSearchPage = () => {
    navigate("/search");
  };

  console.log("지역", searchBarState.region, searchBarState.subRegion);
  console.log(numberOfPeople);
  console.log(startDate, endDate);
  console.log(searchKeyword);

  return (
    <>
      <div className="flex gap-2 items-center">
        {/* 지역 선택 */}
        <div className="flex items-center w-[33%] border bg-white rounded-md p-3 max-h-11">
          <RiMapPinLine />
          <SearchRegion list={RegionList} />
        </div>

        {/* 날짜 선택 */}
        <div className="relative w-[33%]">
          <div
            className="flex items-center border bg-white rounded-md p-3 max-h-11 whitespace-nowrap"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaRegCalendarAlt />
            <div className="flex items-center w-full cursor-pointer text-xs px-2">
              <p className="pr-2">
                {startDate && endDate
                  ? `${formatSimpleDate(startDate)} - ${formatSimpleDate(
                      endDate
                    )}`
                  : "날짜 선택"}
              </p>
              <IoIosArrowDown />
            </div>
          </div>
        </div>

        {/* 인원 선택 */}
        <div className="flex items-center w-[33%] border bg-white rounded-md p-3 max-h-11">
          <MdOutlinePersonOutline />
          <div className="flex items-center text-xs">
            <p className="px-2 whitespace-nowrap">인원 선택</p>
            <div className="flex items-center">
              <AiOutlineMinusCircle
                onClick={handleDecrease}
                className="text-MAIN_GREEN cursor-pointer"
              />
              <p className="px-3">{numberOfPeople}</p>
              <AiOutlinePlusCircle
                onClick={handleIncrease}
                className="text-MAIN_GREEN cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 검색어 입력 */}
      <div className="flex mt-2 items-center">
        <div className="flex w-full items-center border bg-white rounded-md p-3 max-h-11">
          <LuSearch />
          <input
            className="ml-2 outline-none placeholder-black text-xs"
            placeholder="키워드로 캠핑장을 검색해보세요"
            value={searchKeyword}
            onChange={handleKeywordChange}
          ></input>
        </div>
        {/* 검색버튼 */}
        {state === "main" && (
          <button
            onClick={goToSearchPage}
            className="ml-2 px-6 py-3 bg-[#186D41] text-white rounded-md text-sm whitespace-nowrap"
          >
            검색하기
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
