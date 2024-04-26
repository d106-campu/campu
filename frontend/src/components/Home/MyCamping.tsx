import MyCampingItem from "./MyCampingItem";
import dummyImage from "@/assets/images/dummyCamping.png";

const MyCamping = () => {
  // @TODO: 추후 보여줄 개수 수정해야함
  const firstTwoCampingList = myCampingdummyList.slice(0, 5);

  return (
    <>
      <div className="h-auto py-8 w-[70%]">
        <p className="font-extrabold text-xl pt-6">내가 찜한 캠핑장</p>
        <div className="flex">
          <div className="flex justify-center">
            {firstTwoCampingList.map((camping) => (
              <MyCampingItem key={camping.id} camping={camping} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCamping;

// 더미데이터
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
  {
    id: 4,
    name: "캠핑핑캠핑장",
    image: dummyImage,
    rating: 3.8,
    price: "60,000",
    description: "깔끔하고 분위기 좋은 신상 캠핑 숙소",
    location: "경상북도 구미시",
  },
];
