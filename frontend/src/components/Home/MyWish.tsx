import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import MyCampingItem from "./MyCampingItem";
import dummyImage from "@/assets/images/dummyCamping.png";

const MyWish = () => {
  // 처음 두 개의 데이터만 선택합니다.
  const firstTwoCampingList = myCampingdummyList.slice(0, 3);

  return (
    <div className="h-auto w-[60%]">
      <div className="font-extrabold pt-6">
        <p>내가 찜한 캠핑장</p>
      </div>

      {/* 내가 찜한 캠핑장 목록 */}
      <div className="flex justify-around">
        <div className="flex items-center">
          {firstTwoCampingList.map((camping) => (
            <MyCampingItem key={camping.id} camping={camping} />
          ))}
        </div>

        {/* 누르면 마이페이지로 이동 */}
        <div className="text-sm text-gray-500 items-center px-4 flex flex-col justify-center whitespace-nowrap">
          <MdKeyboardDoubleArrowRight />
          <p>더보기</p>
        </div>
      </div>
    </div>
  );
};

export default MyWish;

const myCampingdummyList = [
  {
    id: 1,
    name: "캠핑핑캠핑장",
    image: dummyImage,
    rating: 4.5,
    price: "50,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
  },
  {
    id: 2,
    name: "캠핑핑캠핑장",
    image: dummyImage,
    rating: 4.8,
    price: "40,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 김천시",
  },
  {
    id: 3,
    name: "캠핑핑캠핑장",
    image: dummyImage,
    rating: 3.8,
    price: "60,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
  },
];
