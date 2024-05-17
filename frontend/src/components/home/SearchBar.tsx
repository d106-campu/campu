import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import SearchRegion from "@/components/@common/Search/SearchRegion";
import { RegionList } from "@/components/@common/Search/RegionList";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/app/store";
import {
  dateStringToDate,
  dateToDateString,
  formatSimpleDate,
} from "@/utils/formatDateTime";
import {
  setEndDate,
  setKeyword,
  setPeople,
  setStartDate,
} from "@/features/search/searchBarSlice";
import Modal from "../@common/Modal/Modal";
import CalendarSubmit from "../@common/Calendar/CalendarSubmit";
import Calendar from "../@common/Calendar/Calendar";
import { FaArrowRotateRight } from "react-icons/fa6";

const SearchBar = ({ state }: { state?: string }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchBarState = useSelector((state: RootState) => state.searchBar);
  const toggleScheduleModal = () => {
    setScheduleModal(!scheduleModal); // 모달 토글
    setLocalStartDate(dateStringToDate(startDate)); // 저장 안하고 닫으면 초기화
    setLocalEndDate(dateStringToDate(endDate));
  };

  const { startDate, endDate, keyword } = useSelector(
    (state: RootState) => state.searchBar
  );

  const initialStartDate = dateStringToDate(startDate);
  const initialEndDate = dateStringToDate(endDate);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initialStartDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(initialEndDate);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(
    keyword || null
  );

  console.log(typeof searchKeyword);
  const resetCalendar = () => {
    setLocalStartDate(dateStringToDate(startDate));
    setLocalEndDate(dateStringToDate(endDate));
  };

  // 인원 증감 함수
  const handleDecrease = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
      dispatch(setPeople(numberOfPeople - 1));
    }
  };
  const handleIncrease = () => {
    if (numberOfPeople < 6) {
      setNumberOfPeople(numberOfPeople + 1);
      dispatch(setPeople(numberOfPeople + 1));
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword(value);
    dispatch(setKeyword(value));
  };

  const goToSearchPage = () => {
    navigate("/search");
  };

  // 일정 스토어에 저장
  const calendarSubmit = () => {
    const formattedStartDate = dateToDateString(localStartDate);
    const formattedEndDate = dateToDateString(localEndDate);
    if (formattedStartDate !== null && formattedEndDate !== null) {
      dispatch(setStartDate(formattedStartDate));
      dispatch(setEndDate(formattedEndDate));
    }
  };

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
            onClick={() => toggleScheduleModal()}
          >
            <FaRegCalendarAlt />
            <div className="flex items-center w-full cursor-pointer text-xs px-2">
              <p className="pr-2">
                {!initialStartDate || !initialEndDate ? (
                  <>날짜를 선택해주세요</>
                ) : (
                  <>
                    {formatSimpleDate(initialStartDate)} -{" "}
                    {formatSimpleDate(initialEndDate)}
                  </>
                )}
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
              <p className="px-3">{searchBarState.numberOfPeople}</p>
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
            value={keyword || ""}
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

      {scheduleModal && (
        <Modal width="w-[55%]" onClose={toggleScheduleModal} title="일정 선택">
          <div>
            <div className="w-[70%] h-[375px] mx-auto">
              <Calendar
                startDate={localStartDate}
                endDate={localEndDate}
                setStartDate={setLocalStartDate}
                setEndDate={setLocalEndDate}
              />
            </div>
            <button
              onClick={resetCalendar}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <FaArrowRotateRight color="C9C9C9" />
              <span className="text-GRAY">일정 초기화</span>
            </button>
            <CalendarSubmit
              startDate={localStartDate}
              endDate={localEndDate}
              onClick={() => {
                toggleScheduleModal();
                calendarSubmit();
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default SearchBar;
