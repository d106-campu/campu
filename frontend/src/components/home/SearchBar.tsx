import { RiMapPinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  // 도 리스트
  const provinceList = [
    { id: 1, name: "서울특별시" },
    { id: 2, name: "부산광역시" },
    { id: 3, name: "대구광역시" },
    { id: 4, name: "인천광역시" },
    { id: 5, name: "광주광역시" },
    { id: 6, name: "대전광역시" },
    { id: 7, name: "울산광역시" },
    { id: 8, name: "세종특별자치시" },
    { id: 9, name: "경기도" },
    { id: 10, name: "강원도" },
    { id: 11, name: "충청북도" },
    { id: 12, name: "충청남도" },
    { id: 13, name: "전라북도" },
    { id: 14, name: "전라남도" },
    { id: 15, name: "경상북도" },
    { id: 16, name: "경상남도" },
    { id: 17, name: "제주특별자치도" },
  ];

  return (
    <>
      <div className="flex gap-2 items-center">
        {/* 지역 선택 */}
        <div className="flex items-center flex-grow bg-white rounded-md p-3">
          <RiMapPinLine />
          <select className="rounded-md ml-2 outline-none text-sm">
            <option>지역 선택하기</option>
            {provinceList.map((province, index) => (
              <option key={index} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* 날짜 선택 */}
        <div className="flex items-center flex-grow bg-white rounded-md p-3">
          <FaRegCalendarAlt />
          <select className="rounded-md ml-2 outline-none text-sm">
            <option>날짜 선택하기</option>
          </select>
        </div>

        {/* 인원 선택 */}
        <div className="flex items-center flex-grow bg-white rounded-md p-3">
          <MdOutlinePersonOutline />
          <select className="rounded-md ml-2 outline-none text-sm">
            <option>인원 선택하기</option>
          </select>
        </div>
      </div>

      {/* 검색어 입력 */}
      <div className="flex mt-2 items-center">
        <div className="flex w-full items-center bg-white rounded-md p-3">
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
