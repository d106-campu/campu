import { useState } from "react";
import Modal from "../@common/Modal/Modal";

interface IRoomItem {
  id: number;
  name: string;
  image: string;
  price: string;
  type: string;
  minPeople: number;
  maxPeople: number;
  addPrice: number;
  toilet: boolean;
}

const RoomItem = ({ room }: { room: IRoomItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full flex items-center px-8 border-b py-2">
        <div key={room.id} className="px-2 w-[40%]">
          <img
            src={room.image}
            alt={room.name}
            className="w-full rounded-md h-30 object-cover object-center"
          />
        </div>
        <div className="w-full px-2">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">{room.name}</h1>
            <p className="text-xl text-orange-700 font-extrabold">
              {room.price} 원
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-sm py-2">
              <p>{room.type}</p>
              <p>
                기준인원 {room.minPeople} 명 / 최대인원 {room.maxPeople} 명
              </p>
              <p>인원 추가 가격 : {room.addPrice} 원</p>
              <p>개별 화장실 유무 : {room.toilet ? "유" : "무"}</p>
            </div>
            <div>
              <button
                className="bg-MAIN_GREEN px-4 py-2 text-sm rounded-md text-white"
                onClick={toggleModal}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal width="w-96" onClose={toggleModal}>
          <div className="text-center">
            <p>모달 테스트</p>
            <p>모달 테스트</p>
            <p>모달 테스트</p>
            <p>모달 테스트</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomItem;
