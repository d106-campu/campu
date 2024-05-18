import LikeButton from "@/components/@common/Like/LikeButton";
import { ICampsiteSimpleRes } from "@/types/search";
import { scrollToTop } from "@/utils/scrollToTop";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const RecommendItem = ({ item }: { item: ICampsiteSimpleRes }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/camps/${item.id}`);
    scrollToTop();
  };

  return (
    <>
      <div
        onClick={goToDetail}
        key={item.id}
        className="px-2 py-4 w-[33%] relative"
      >
        <img
          src={item.thumbnailImageUrl}
          alt={item.facltNm}
          className="w-full rounded-md h-40 object-cover object-center"
        />
        <div className="absolute top-7 right-4">
          <LikeButton like={item.like} campsiteId={item.id} iconSize={25} />
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">{item.facltNm}</h1>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mx-1" />
              <p>{item.score.toFixed(1)}</p>
            </div>
          </div>
          <p className="text-xl text-orange-700 font-extrabold">
            {item.price.toLocaleString("ko-KR")} ~
          </p>
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
