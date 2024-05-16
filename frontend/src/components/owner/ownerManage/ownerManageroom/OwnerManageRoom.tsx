import { GoPlus } from "react-icons/go";
import dummy from "@/assets/images/dummyCamping3.png";
import RoomItem from "@/components/owner/ownerManage/ownerManageroom/RoomItem";
import { useRef, useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import { CiCamera } from "react-icons/ci";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { testUseOwner } from "@/hooks/owner/testUserOwner"; // 경로 수정해주세용
import { IRoomCreateReq } from "@/types/testOwner"; // 경로 수정해주세용
import { useEffect } from "react";

const OwnerManageRoom = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  // const [standardeople, setStandardPeople] = useState<number>(2); // 기준인원 계산
  // const [maxPeople, setMaxPeople] = useState<number>(4); // 최대 인원 계산

  const [roomName, setRoomName] = useState<string>(""); // 추가 방 이름
  const [price, setPrice] = useState<number>(0); // 가격
  const [baseNo, setBaseNo] = useState<number>(2); // 기준 인원
  const [maxNo, setMaxNo] = useState<number>(4); // 최대 인원
  const [extraPrice, setExtraPrice] = useState<number>(0); // 추가 인원 가격
  const [toilet, setIsToilet] = useState<boolean>(true); // 화장실 유무
  const { usePostCampsiteRoom } = testUseOwner();
  const postCampsiteRoomMutation = usePostCampsiteRoom();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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

  // 방 등록 테스트 -> test로 만들어놓은 hooks-services-type 참고하여 import 수정해야함
  const handleSubmit = () => {
    if (image) {
      const createRequestDto: IRoomCreateReq = {
        campsiteId: 1,
        induty: selectedCampingType || "카라반",
        roomName,
        price,
        baseNo,
        maxNo,
        extraPrice,
        toilet,
      };

      console.log("보내는 induty :", createRequestDto.induty)
      // 캠핑장 방 등록 API 연결 뮤테이틑
      postCampsiteRoomMutation.mutate({ file: image, createRequestDto });
      toggleModal(); // 모달 닫기
    } else {
      console.error("이미지 파일을 선택하세요.");
    }
  };

  const campingTypes = ["캠핑", "글램핑", "오토캠핑", "카라반"];
  const [selectedCampingType, setSelectedCampingType] = useState<string | null>(null);

  const toggleCampingType = (campingType: string) => {
    setSelectedCampingType(
      campingType === selectedCampingType ? null : campingType
    );
  };

  useEffect(() => {
    console.log("선택한 유형 타입 :", selectedCampingType);
  }, [selectedCampingType]);

  const increaseStandard = () => {
    if (baseNo < maxNo) {
      setBaseNo(baseNo + 1);
    }
  };
  const decreaseStandard = () => {
    if (baseNo > 1) {
      setBaseNo(baseNo - 1);
    }
  };
  const increaseMax = () => {
    setMaxNo(maxNo + 1);
  };
  const decreaseMax = () => {
    if (maxNo > baseNo) {
      setMaxNo(maxNo - 1);
    }
  };

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
                          selectedCampingType === type ? "border border-MAIN_GREEN text-MAIN_GREEN font-semibold" : "border border-gray-200 text-gray-500"
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
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                {/* 방 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 가격</p>
                  <input
                    type="number"
                    className="p-2 border-b outline-none w-full"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                {/* 인원 */}
                <div className="flex pr-4 items-center justify-between">
                  <p className="p-3 text-gray-500">기준 인원</p>
                  <div className="flex items-center">
                    <AiOutlineMinusCircle
                      onClick={decreaseStandard}
                      className="text-MAIN_GREEN cursor-pointer"
                    />
                    <p className="p-3">{baseNo}</p>
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
                    <p className="p-3">{maxNo}</p>
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
                    type="number"
                    className="p-2 border-b outline-none w-full"
                    value={extraPrice}
                    onChange={(e) => setExtraPrice(Number(e.target.value))}
                  />
                </div>
                {/* 화장실 유무 */}
                <div className="flex items-center justify-start">
                  <p className="p-3 whitespace-nowrap text-gray-500">
                    개별 화장실 유무
                  </p>
                  <div className="flex items-center text-sm">
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tl rounded-bl cursor-pointer ${
                        toilet
                          ? "bg-MAIN_GREEN text-white"
                          : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setIsToilet(true)}
                    >
                      유
                    </div>
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tr rounded-br cursor-pointer ${
                        !toilet
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
                  <button
                    className="bg-MAIN_GREEN text-white text-sm w-full rounded-md py-2"
                    onClick={handleSubmit}
                  >
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
