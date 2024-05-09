import { ICampsiteSimpleRes } from "@/types/search";
import { FaStar } from "react-icons/fa6";

const RecommendItem = ({ item }: { item: ICampsiteSimpleRes }) => {
  // @TODO: 백엔드 구현 끝나면 별점, 가격 추가해야함
  return (
    <>
      <div key={item.id} className="px-2 py-4 w-[33%]">
        <img
          src={item.thumbnailImageUrl}
          alt={item.facltNm}
          className="w-full rounded-md h-40 object-cover object-center"
        />
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">{item.facltNm}</h1>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mx-1" />
              <p>4.0</p>
            </div>
          </div>
          <p className="text-xl text-orange-700 font-extrabold">45,000 ~</p>
          <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
            {item.lineIntro}
          </p>
          <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {item.addr1}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecommendItem;
