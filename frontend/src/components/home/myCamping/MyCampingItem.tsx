import LikeButton from "@/components/@common/Like/LikeButton";
import { IMyFavoritCampRes } from "@/types/my";
import { scrollToTop } from "@/utils/scrollToTop";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MyCampingItem = ({ camping }: { camping: IMyFavoritCampRes }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/camps/${camping.campsiteId}`);
    scrollToTop();
  };

  return (
    <div
      onClick={goToDetail}
      key={camping.campsiteId}
      className="px-2 py-5 w-[25%] relative cursor-pointer"
    >
      <img
        src={camping.thumbnailImageUrl}
        alt={camping.campsiteName}
        className="w-full rounded-md h-32 object-cover object-center"
      />
      <div className="absolute top-7 right-4">
        <LikeButton like={true} campsiteId={camping.campsiteId} iconSize={25} />
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold">{camping.campsiteName}</h1>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mx-1" />
            <p>{camping.score.toFixed(1)}</p>
          </div>
        </div>
        <p className="text-xl text-orange-700 font-extrabold">
          {camping.minPrice.toLocaleString("ko-KR")}원 ~
        </p>
        <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
          {camping.lineIntro}
        </p>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {camping.address}
        </p>
      </div>
    </div>
  );
};

export default MyCampingItem;
