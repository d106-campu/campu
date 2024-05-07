import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import SearchRegion from "@/components/@common/Search/SearchRegion";
import { RegionList } from "@/components/@common/Search/RegionList";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "../@common/Calendar/Calendar";
import { FaArrowRotateRight } from "react-icons/fa6";
import CalendarSubmit from "../@common/Calendar/CalendarSubmit";

const SearchBar = () => {
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);

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

  return (
    <>
      <div className="flex gap-2 items-center">
        {/* 지역 선택 */}
        <div className="flex items-center w-[33%] border bg-white rounded-md p-3 max-h-11">
          <RiMapPinLine />
          <SearchRegion arr={RegionList} />
        </div>

        {/* 날짜 선택 */}
        <div className="relative w-[33%]">
          <div
            className="flex items-center border bg-white rounded-md p-3 max-h-11"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaRegCalendarAlt />
            <div className="flex items-center w-full cursor-pointer text-sm px-2">
              <p className="pr-2">날짜 선택</p>
              <IoIosArrowDown />
            </div>
          </div>
          {showCalendar && (
            <div className="absolute top-full left-0 bg-white rounded-md z-20 mt-1 w-[400px] border pb-4">
              <Calendar />
              <div className="px-8">
                <button className="flex items-center gap-2 cursor-pointer p-2">
                  <FaArrowRotateRight color="C9C9C9" />
                  <span className="text-GRAY">일정 초기화</span>
                </button>
                <CalendarSubmit></CalendarSubmit>
              </div>
            </div>
          )}
        </div>

        {/* 인원 선택 */}
        <div className="flex items-center w-[33%] border bg-white rounded-md p-3 max-h-11">
          <MdOutlinePersonOutline />
          <div className="flex items-center text-sm">
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
