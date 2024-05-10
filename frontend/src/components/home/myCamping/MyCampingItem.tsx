import LikeButton from "@/components/@common/Like/LikeButton";
import { FaStar } from "react-icons/fa6";

interface IMyCamping {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  description: string;
  location: string;
}

const MyCampingItem = ({ camping }: { camping: IMyCamping }) => {
  return (
    <div key={camping.id} className="px-2 py-5 w-[25%] relative">
      <img
        src={camping.image}
        alt={camping.name}
        className="w-full rounded-md h-32 object-cover object-center"
      />
      <div className="absolute top-7 right-4">
        <LikeButton campsiteId={camping.id} iconSize={25} />
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold">{camping.name}</h1>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mx-1" />
            <p>{camping.rating.toFixed(1)}</p>
          </div>
        </div>
        <p className="text-xl text-orange-700 font-extrabold">
          {camping.price.toLocaleString("ko-KR")}원 ~
        </p>
        <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
          {camping.description}
        </p>
        <p className="text-sm text-gray-400">{camping.location}</p>
      </div>
    </div>
  );
};

export default MyCampingItem;
