import { GoPlus } from "react-icons/go";
import dummy from "@/assets/images/dummyCamping3.png";
import RoomItem from "./RoomItem";

const OwnerManageRoom = () => {
  return (
    <>
      <div>
        {/* @TODO: 모달 오픈 추가해야함 */}
        <div className="flex items-center font-semibold p-4">
          방 추가하기
          <GoPlus className="text-MAIN_GREEN px-1" size="1.5rem" />
        </div>

        <div>
          {/* 각 방에 대한 RoomItem 렌더링 */}
          {dummyRooms.map((room) => (
            <RoomItem key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OwnerManageRoom;

// 더미 데이터
const dummyRooms = [
  {
    id: 1,
    name: "A구역 (벚꽃캠핑존)",
    image: dummy,
    price: "50,000",
    type: "캠핑",
    minPeople: 2,
    maxPeople: 4,
    addPrice: 10000,
    toilet: true
  },
  {
    id: 2,
    name: "B구역 (키즈놀이터존)",
    image: dummy,
    price: "50,000",
    type: "캠핑",
    minPeople: 2,
    maxPeople: 4,
    addPrice: 10000,
    toilet: false
  },
  {
    id: 3,
    name: "C구역 (주차장  근처)",
    image: dummy,
    price: "50,000",
    type: "캠핑",
    minPeople: 2,
    maxPeople: 4,
    addPrice: 10000,
    toilet: false
  },
];
