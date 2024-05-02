import { ICampingGround } from "@/types/search";
import { FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const SearchCampingItem = ({ camping }: { camping: ICampingGround }) => {
  const isAvailable = camping.available;

  return (
    <div className="flex py-2 text-sm items-center border-b">
      <div className="w-[40%] relative">
        {!isAvailable && (
          <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
        )}
        <img
          src={camping.thumbnailImageUrl}
          className="w-full rounded-md h-28 object-cover object-center"
        />
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
            예약 마감
          </div>
        )}
      </div>
      <div className="pl-4 w-[60%]">
        <div className="flex py-1">
          <p className="text-xl font-semibold">{camping.facltNm}</p>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 ml-2 mr-1" />
            <p>{camping.rate}</p>
          </div>
        </div>
        <div>
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {camping.lineIntro}
          </p>
          <p className="text-gray-500 text-md flex items-center">
            <FiMapPin />
            <p className="px-1">
              {camping.doNm} {camping.sigunguNm}
            </p>
          </p>
        </div>
        {/* @TODO: id 값에 따라 navigate 처리 해야함 */}
        <div className="flex justify-between px-2 py-1">
          <p
            className={`${
              !isAvailable ? "text-gray-300" : "text-MAIN_RED"
            } font-bold text-2xl`}
          >
            {camping.price} ~
          </p>
          <button className="border border-MAIN_GREEN px-4 rounded-md text-MAIN_GREEN text-xs">
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCampingItem;
