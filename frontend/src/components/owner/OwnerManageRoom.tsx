import { GoPlus } from "react-icons/go";
import dummy from "@/assets/images/dummyCamping3.png";
import RoomItem from "@/components/owner/RoomItem"
import { useRef, useState } from "react";
import Modal from "@/components/@common/Modal/Modal"
import { CiCamera } from "react-icons/ci";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const OwnerManageRoom = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [photo, setPhoto] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();

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
    null
  );

  const toggleCampingType = (campingType: string) => {
    setSelectedCampingType(
      campingType === selectedCampingType ? null : campingType
    );
  };

  // 기준인원 및 최대 인원 계산
  const [standardeople, setStandardPeople] = useState<number>(2);
  const [maxPeople, setMaxPeople] = useState<number>(4);

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

  // 화장실 유무
  const [isToilet, setIsToilet] = useState<boolean>(true);

  return (
    <>
      <div>
        <div
          className="flex items-center font-semibold p-4"
          onClick={toggleModal}
        >
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
      {isOpen && (
        <Modal width="w-[45%]" onClose={toggleModal}>
          <div className="flex flex-col justify-center text-center pb-4">
            <p className="font-semibold">방 등록하기</p>

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
                  <input className="p-2 border-b outline-none w-full"></input>
                </div>
                {/* 방 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 가격</p>
                  <input className="p-2 border-b outline-none w-full"></input>
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
                  <input className="p-2 border-b outline-none w-full"></input>
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
                <div className="pt-8">
                  <button className="bg-MAIN_GREEN text-white text-sm w-full rounded-md py-2">
                    등록하기
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
    toilet: true,
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
    toilet: false,
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
    toilet: false,
  },
];
