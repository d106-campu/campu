import { useRef, useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import { CiCamera } from "react-icons/ci";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

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
  const [photo, setPhoto] = useState<string>(`${room.image}`);
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  // 기준인원 및 최대 인원 수정
  const [standardeople, setStandardPeople] = useState<number>(room.minPeople);
  const [maxPeople, setMaxPeople] = useState<number>(room.maxPeople);
  // 화장실 유무 수정
  const [isToilet, setIsToilet] = useState<boolean>(room.toilet);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  console.log(image?.type);

  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file: File | undefined = imgRef.current.files[0];
      setImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          setPhoto(result);
        };
      }
    }
  };

  const campingTypes = ["캠핑", "글램핑", "오토캠핑", "카라반"];
  const [selectedCampingType, setSelectedCampingType] = useState<string | null>(
    `${room.type}`
  );

  const toggleCampingType = (campingType: string) => {
    setSelectedCampingType(
      campingType === selectedCampingType ? null : campingType
    );
  };

  const increaseStandard = () => {
    if (standardeople < maxPeople) {
      setStandardPeople(standardeople + 1);
    }
  };
  const decreaseStandard = () => {
    if (standardeople > 1) {
      setStandardPeople(standardeople - 1);
    }
  };
  const increaseMax = () => {
    setMaxPeople(maxPeople + 1);
  };
  const decreaseMax = () => {
    if (maxPeople > standardeople) {
      setMaxPeople(maxPeople - 1);
    }
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
        <Modal width="w-[45%]" onClose={toggleModal}>
          <div className="flex flex-col justify-center text-center pb-4">
            <p className="font-semibold">방 정보 수정하기</p>

            {/* 사진 등록 */}
            <div className="flex justify-center py-4">
              <label
                className="w-[50%] flex border border-gray-300 items-center justify-center h-44 rounded-lg"
                htmlFor="photo"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="photo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <CiCamera
                    className="flex justify-center"
                    size="2rem"
                    color="#878787"
                  />
                )}
                <input
                  name="photo"
                  onChange={saveImgFile}
                  ref={imgRef}
                  multiple
                  type="file"
                  accept="image/*"
                  id="photo"
                  className="hidden w-full h-full cursor-pointer"
                ></input>
              </label>
            </div>

            {/* 방 정보 */}
            <div className="flex text-sm justify-center py-4">
              <div>
                {/* 캠핑장 유형 */}
                <div className="flex items-center justify-between">
                  <p className="p-3 text-gray-500">방 유형</p>
                  <div className="flex space-x-2 p-2">
                    {campingTypes.map((type) => (
                      <div
                        key={type}
                        className={`${
                          selectedCampingType === type
                            ? "border border-MAIN_GREEN text-MAIN_GREEN font-semibold"
                            : "border border-gray-200 text-gray-500"
                        } px-4 py-1 rounded-md`}
                        onClick={() => toggleCampingType(type)}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
                {/* 방 이름 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 이름</p>
                  <input
                    className="p-2 border-b outline-none w-full"
                    value={room.name}
                  ></input>
                </div>
                {/* 방 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 가격</p>
                  <input
                    className="p-2 border-b outline-none w-full"
                    value={room.price}
                  ></input>
                </div>
                {/* 인원 */}
                <div className="flex pr-4 items-center justify-between">
                  <p className="p-3 text-gray-500">기준 인원</p>
                  <div className="flex items-center">
                    <AiOutlineMinusCircle
                      onClick={decreaseStandard}
                      className="text-MAIN_GREEN cursor-pointer"
                    />
                    <p className="p-3">{standardeople}</p>
                    <AiOutlinePlusCircle
                      onClick={increaseStandard}
                      className="text-MAIN_GREEN cursor-pointer"
                    />
                  </div>
                  <p className="p-3 text-gray-500">최대 인원</p>
                  <div className="flex items-center">
                    <AiOutlineMinusCircle
                      onClick={decreaseMax}
                      className="text-MAIN_GREEN cursor-pointer"
                    />
                    <p className="p-3">{maxPeople}</p>
                    <AiOutlinePlusCircle
                      onClick={increaseMax}
                      className="text-MAIN_GREEN cursor-pointer"
                    />
                  </div>
                </div>
                {/* 추가 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">
                    추가 인원 가격
                  </p>
                  <input
                    className="p-2 border-b outline-none w-full"
                    value={room.addPrice}
                  ></input>
                </div>
                {/* 화장실 유무 */}
                <div className="flex items-center justify-start">
                  <p className="p-3 whitespace-nowrap text-gray-500">
                    개별 화장실 유무
                  </p>
                  <div className="flex items-center text-sm">
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tl rounded-bl cursor-pointer ${
                        isToilet
                          ? "bg-MAIN_GREEN text-white"
                          : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setIsToilet(true)}
                    >
                      유
                    </div>
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tr rounded-br cursor-pointer ${
                        !isToilet
                          ? "bg-MAIN_GREEN text-white"
                          : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setIsToilet(false)}
                    >
                      무
                    </div>
                  </div>
                </div>

                {/* post 버튼 */}
                <div className="pt-8 flex justify-around">
                  <button className="bg-MAIN_GREEN text-white text-sm w-[48%] rounded-md py-2">
                    수정하기
                  </button>
                  <button className="bg-gray-500 text-white text-sm w-[48%] rounded-md py-2">
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomItem;
