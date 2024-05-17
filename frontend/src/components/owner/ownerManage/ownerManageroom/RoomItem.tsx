import { useRef, useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import { CiCamera } from "react-icons/ci";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useOwner } from "@/hooks/owner/useOwner";

interface IRoomItem {
  room: {
    roomId: number;
    imageUrl: string;
    induty: string;
    roomName: string;
    baseNo: number;
    maxNo: number;
    price: number;
    extraPrice: number;
    toilet: boolean;
  };
  onDelete: (roomId: number) => void; // 삭제 기능을 위한 props
  refetch: () => void;
}

const RoomItem = ({ room, onDelete, refetch }: IRoomItem) => {
  const { useUpdateCampsiteRoom } = useOwner();
  const updateCampsiteRoomMutation = useUpdateCampsiteRoom();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>(`${room.imageUrl}`);
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [roomName, setRoomName] = useState<string>(room.roomName);
  const [price, setPrice] = useState<number>(room.price);
  const [extraPrice, setExtraPrice] = useState<number>(room.extraPrice);
  const [baseNo, setBaseNo] = useState<number>(room.baseNo);
  const [maxNo, setMaxNo] = useState<number>(room.maxNo);
  const [toilet, setToilet] = useState<boolean>(room.toilet);
  const campingTypes = ["캠핑", "글램핑", "오토캠핑", "카라반"];
  const [selectedCampingType, setSelectedCampingType] = useState<string | null>(
    `${room.induty}`
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const saveImgFile = () => {
    // console.log(image?.type);
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

  // 방 수정 테스트 -> 나중에 경로 바꾸면 재확인해주세요
  const handleUpdate = () => {
    if (image && room.roomId) {
      const updateRequestDto = {
        induty: selectedCampingType || room.induty,
        roomName,
        price,
        baseNo,
        maxNo,
        extraPrice,
        toilet,
      };

      // 일단은 여기에 담아서 mutate할 때 인자로 전송
      const updateRequest = {
        roomId: room.roomId,
        file: image,
        updateRequestDto,
      };

      // 방 수정 API 연결
      updateCampsiteRoomMutation.mutate(updateRequest, {
        onSuccess: () => {
          toggleModal();
          refetch(); // 수정 후 목록 갱신
        },
      });
    } else {
      console.error("이미지 파일을 선택하세요.");
    }
  };

  // 방 삭제 확인 모달 작동
  const confirmDeleteAlert = () => {
    onDelete(room.roomId);
    setShowDeleteModal(false);
  };

  const toggleCampingType = (campingType: string) => {
    setSelectedCampingType(
      campingType === selectedCampingType ? null : campingType
    );
  };

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
      <div className="w-full flex items-center px-8 border-b py-2">
        <div key={room.roomId} className="px-2 w-[40%]">
          <img
            src={room.imageUrl}
            alt={room.roomName}
            className="w-full rounded-md h-[150px] object-cover object-center"
          />
        </div>
        <div className="w-full px-2">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">{room.roomName}</h1>
            <p className="text-xl text-orange-700 font-extrabold">
              {room.price.toLocaleString()} 원
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-sm py-2">
              <p>
                등록 유형 :{" "}
                <span className="text-MAIN_GREEN">{room.induty}</span>
              </p>
              <p>
                기준인원 :{" "}
                <span className="text-MAIN_GREEN">{room.baseNo}</span> 명 /
                최대인원 : <span className="text-MAIN_GREEN">{room.maxNo}</span>{" "}
                명
              </p>
              <p>
                인원 추가 가격 :{" "}
                <span className="text-red-500">
                  {room.extraPrice.toLocaleString()}원
                </span>
              </p>
              <p>개별 화장실 유무 : {room.toilet ? "유" : "무"}</p>
            </div>
            <div>
              <button
                className="bg-MAIN_GREEN hover:bg-green-900 px-4 py-2 text-sm rounded-md text-white"
                onClick={toggleModal}
              >
                수정하기
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 px-4 py-2 text-sm rounded-md text-white ml-1"
                onClick={() => setShowDeleteModal(true)}
              >
                삭제하기
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
                    className="p-2  border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  ></input>
                </div>
                {/* 방 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 가격</p>
                  <input
                    className="p-2  border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
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
                    className="p-2  border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={extraPrice}
                    onChange={(e) => setExtraPrice(Number(e.target.value))}
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
                        toilet ? "bg-MAIN_GREEN text-white" : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setToilet(true)}
                    >
                      유
                    </div>
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tr rounded-br cursor-pointer ${
                        !toilet ? "bg-MAIN_GREEN text-white" : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setToilet(false)}
                    >
                      무
                    </div>
                  </div>
                </div>

                {/* post 버튼 */}
                <div className="pt-8 flex justify-around">
                  <button
                    className="bg-MAIN_GREEN text-white text-sm w-[48%] rounded-md py-2"
                    onClick={handleUpdate}
                  >
                    수정하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 방 삭제 시 모달 호출 */}
      {showDeleteModal && (
        <Modal
          width="w-1/3"
          title="캠핑장 방 삭제 확인"
          hasIcon={false}
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="text-center p-1">
            <div className="pt-4">
              <p>
                이 캠핑장 방을 <span className="text-red-500">삭제</span>
                하시겠어요?
              </p>
            </div>
            <div className="mt-4 flex justify-around">
              <button
                className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
                onClick={confirmDeleteAlert}
              >
                <span>삭제합니다</span>
              </button>
              <button
                className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
                onClick={() => setShowDeleteModal(false)}
              >
                <span>아니요</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomItem;
