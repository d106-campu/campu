import { GoPlus } from "react-icons/go";
import RoomItem from "@/components/owner/ownerManage/ownerManageroom/RoomItem";
import { useRef, useState, useEffect } from "react";
import Modal from "@/components/@common/Modal/Modal";
import { CiCamera } from "react-icons/ci";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useOwner } from "@/hooks/owner/useOwner";
import { IRoomCreateReq } from "@/types/owner";

const OwnerManageRoom = () => {
  const { useCampsiteRoomList, usePostCampsiteRoom, useDeleteCampsiteRoom } =
    useOwner();
  const campsiteId = useSelector(
    (state: RootState) => state.ownerSide.campsiteId
  );
  const {
    data: roomListResponse,
    isLoading: isRoomListLoading,
    refetch: refetchRoomList,
  } = useCampsiteRoomList({ campsiteId: campsiteId || 0 });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  // const [standardeople, setStandardPeople] = useState<number>(2); // 기준인원 계산
  // const [maxPeople, setMaxPeople] = useState<number>(4); // 최대 인원 계산

  const [roomName, setRoomName] = useState<string>(""); // 추가 방 이름
  const [price, setPrice] = useState<string>(""); // 가격
  const [baseNo, setBaseNo] = useState<number>(2); // 기준 인원
  const [maxNo, setMaxNo] = useState<number>(4); // 최대 인원
  const [extraPrice, setExtraPrice] = useState<string>(""); // 추가 인원 가격
  const [toilet, setIsToilet] = useState<boolean>(true); // 화장실 유무

  const postCampsiteRoomMutation = usePostCampsiteRoom();
  const deleteCampsiteRoomMutation = useDeleteCampsiteRoom();
  const roomList = roomListResponse?.data?.roomList || [];

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

  const handleSubmit = () => {
    if (image && campsiteId) {
      const createRequestDto: IRoomCreateReq = {
        campsiteId,
        induty: selectedCampingType || "캠핑",
        roomName,
        price: Number(price),
        baseNo,
        maxNo,
        extraPrice: Number(extraPrice),
        toilet,
      };

      console.log("보내는 induty :", createRequestDto.induty);
      // 캠핑장 방 등록 API 연결 뮤테이트
      postCampsiteRoomMutation.mutate(
        { file: image, createRequestDto },
        {
          onSuccess: () => {
            console.log("방 등록 성공했음");
            refetchRoomList(); // 등록 성공 시 방 목록 다시 리패치
            toggleModal();
          },
          onError: (error) => {
            console.error("방 등록 실패했음", error);
          },
        }
      );
      toggleModal(); // 모달 닫기
    } else {
      console.error("이미지 파일을 선택하세요.");
    }
  };

  // 방 삭제 테스트
  const handleDelete = (roomId: number) => {
    deleteCampsiteRoomMutation.mutate(
      { roomId },
      {
        onSuccess: () => {
          refetchRoomList(); // 삭제 성공 시 목록 다시 리패치
        },
      }
    );
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

  useEffect(() => {
    console.log("선택한 유형 타입 확인 :", selectedCampingType);
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

  if (isRoomListLoading) {
    return <div>로딩중입니다. 잠시만 기다려주세요 😃</div>;
  }

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
          {roomList.map((room) => (
            <RoomItem
              key={room.roomId}
              room={room}
              onDelete={handleDelete}
              refetch={refetchRoomList}
            />
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
                            ? "border border-MAIN_GREEN text-MAIN_GREEN font-semibold cursor-pointer"
                            : "border border-gray-200 text-gray-500 cursor-pointer"
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
                    className="p-2 border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                {/* 방 가격 */}
                <div className="flex items-center">
                  <p className="p-3 whitespace-nowrap text-gray-500">방 가격</p>
                  <input
                    type="number"
                    className="p-2  border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    className="p-2  border-b border-gray-300 outline-none w-full focus:ring-0 focus:border-gray-300 rounded-md"
                    value={extraPrice}
                    onChange={(e) => setExtraPrice(e.target.value)}
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
                        toilet ? "bg-MAIN_GREEN text-white" : "text-MAIN_GREEN"
                      }`}
                      onClick={() => setIsToilet(true)}
                    >
                      유
                    </div>
                    <div
                      className={`border border-MAIN_GREEN px-6 py-1 rounded-tr rounded-br cursor-pointer ${
                        !toilet ? "bg-MAIN_GREEN text-white" : "text-MAIN_GREEN"
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
