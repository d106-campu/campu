import Button from "@/components/@common/Button/Button";

interface IRoomItemProps {
  campsiteId: number;
  roomId: number;
  image: string;
  name: string;
  induty: string;
  baseNo: number;
  maxNo: number;
  price: number;
  extraPrice: number;
  roomCnt: number;
  toiletCnt: number;
  supplyList: string[];
  available: boolean;
}

const RoomItem = ({ room }: { room: IRoomItemProps }) => {
  return (
    <div
      className={`w-full flex items-center border-b py-7 ${
        room.available ? "text-BLACK" : "text-UNIMPORTANT_TEXT_02"
      }`}
    >
      <div key={room.roomId} className="w-[50%] relative">
        <img
          src={room.image}
          alt={room.name}
          className={`w-full h-40 rounded-lg h-30 object-cover object-center ${
            room.available ? "" : "opacity-30"
          }`}
        />
        {!room.available && (
          <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-2xl bg-black bg-opacity-30 rounded-lg">
            예약 마감
          </span>
        )}
      </div>
      <div className="flex justify-between h-40 w-full pl-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold pb-3">{room.name}</h1>
          <div className="flex justify-between gap-14">
            <div>
              <p className="pb-[4px]">{room.induty}</p>
              <p className="pb-[4px]">
                기준 {room.baseNo}인 (최대 {room.maxNo}인)
              </p>
              <p className="pb-[4px]">
                인원 추가 가격 : {room.extraPrice.toLocaleString("ko-KR")}원
              </p>
              <p className="pb-[4px]">화장실 개수: {room.toiletCnt}</p>
            </div>
            {room.supplyList.length > 0 && (
              <>
                <div className="border-r" />
                <div>
                  {room.supplyList &&
                    room.supplyList.map((item, index) => (
                      <p key={index} className="pb-[4px]">
                        {item}
                      </p>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>
            <p
              className={`text-2xl font-extrabold ${
                room.available ? "text-MAIN_RED" : "text-SUB_RED"
              }`}
            >
              {room.price.toLocaleString("ko-KR")}원
            </p>
            {!room.available && (
              <p className="text-end text-lg font-extrabold text-[#707070]">
                예약 마감
              </p>
            )}
          </div>
          {room.available ? (
            <Button width="w-40" text="예약하기" />
          ) : (
            <Button
              width="w-40"
              text="빈자리 알림 받기"
              textColor="text-MAIN_GREEN"
              backgroundColor="bg-SUB_GREEN_02"
              hoverBackgroundColor="hover:bg-[#d0e2d3]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default RoomItem;
