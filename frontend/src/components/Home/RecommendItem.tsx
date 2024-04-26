import { FaStar } from "react-icons/fa6";

interface ICampingItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  type: string;
  location: string;
  thema: string[];
}

const RecommendItem = ({ item }: { item: ICampingItem }) => {
  return (
    <>
      <div key={item.id} className="px-2 py-4 w-[33%]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full rounded-md h-40 object-cover object-center"
        />
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="font-bold">{item.name}</h1>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mx-1" />
              <p>{item.rating}</p>
            </div>
          </div>
          <p className="text-xl text-orange-700 font-extrabold">
            {item.price} ~
          </p>
          <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
            {item.description}
          </p>
          <p className="text-sm text-gray-400">{item.location}</p>
        </div>
      </div>
    </>
  );
};

export default RecommendItem;
