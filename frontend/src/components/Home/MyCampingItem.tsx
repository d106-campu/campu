import { FaStar } from "react-icons/fa6";

interface IMyCamping {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  location: string;
}

const MyCampingItem = ({ camping }: { camping: IMyCamping }) => {
  return (
    <div key={camping.id} className="px-2 py-5 w-[30%]">
      <img
        src={camping.image}
        alt={camping.name}
        className="w-full rounded-md"
      />
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold">{camping.name}</h1>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mx-1" />
            <p>{camping.rating}</p>
          </div>
        </div>
        <p className="text-xl text-orange-700 font-extrabold">
          {camping.price} ~
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
