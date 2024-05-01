import Button from "../@common/Button/Button";

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
    <div className="w-full flex items-center border-b py-7 text-BLACK">
      <div key={room.roomId} className="w-[50%]">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-40 rounded-lg h-30 object-cover object-center"
        />
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
        <div className="flex flex-col  justify-between items-end">
          <p className="text-2xl text-orange-700 font-extrabold">
            {room.price.toLocaleString("ko-KR")}원
          </p>
          <Button width="w-40" text="예약하기" textSize="" />
        </div>
      </div>
    </div>
  );
};
export default RoomItem;
