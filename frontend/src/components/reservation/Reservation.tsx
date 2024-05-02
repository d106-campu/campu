import RoomItem from "@/components/reservation/RoomItem";
import MyController from "@/components/reservation/MyController";

const Reservation = () => {
  return (
    <>
      {/* 캠핑존 둘러보기 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold pb-5">
          캠핑존 둘러보기{" "}
          <span className="text-xl font-bold text-[#46A14F]">
            {data.content.length}
          </span>
        </h3>
        <MyController
          headCount={headConunt}
          startDate={startDate}
          endDate={endDate}
        />
        <div>
          {/* 각 방에 대한 RoomItem 렌더링 */}
          {data.content.map((room) => (
            <RoomItem key={room.roomId} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Reservation;
import dummy1 from "@/assets/images/dummy/camping_spot_6.png";
import dummy2 from "@/assets/images/dummy/camping_spot_1.png";
import dummy3 from "@/assets/images/dummy/camping_spot_2.png";
import dummy4 from "@/assets/images/dummy/camping_spot_3.png";
import dummy5 from "@/assets/images/dummy/camping_spot_4.jpg";

// 더미 데이터
const headConunt = 2;
const startDate = "2024-05-10";
const endDate = "2024-05-14";

// 더미 데이터
const data = {
  content: [
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 1,
      image: dummy1,
      name: "A구역 (벚꽃 캠핑존)", // 방 이름
      induty: "텐트", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 6, // 최대 인원
      price: 60000, // 가격
      extraPrice: 20000, // 인당 추가가격
      roomCnt: 2, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
      available: true, // 예약 가능 여부
    },
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 2,
      image: dummy2,
      name: "B구역 (마운틴뷰)", // 방 이름
      induty: "오토캠핑", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 4, // 최대 인원
      price: 80000, // 가격
      extraPrice: 20000, // 인당 추가가격
      roomCnt: 1, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
      available: true, // 예약 가능 여부
    },
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 3,
      image: dummy3,
      name: "C구역 (별자리 명소)", // 방 이름
      induty: "카라반", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 4, // 최대 인원
      price: 100000, // 가격
      extraPrice: 30000, // 인당 추가가격
      roomCnt: 2, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
      available: true, // 예약 가능 여부
    },
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 4,
      image: dummy4,
      name: "D구역 (별자리 명소)", // 방 이름
      induty: "카라반", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 5, // 최대 인원
      price: 100000, // 가격
      extraPrice: 30000, // 인당 추가가격
      roomCnt: 2, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
      available: false, // 예약 가능 여부
    },
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 5,
      image: dummy5,
      name: "E구역 (별자리 명소)", // 방 이름
      induty: "카라반", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 4, // 최대 인원
      price: 100000, // 가격
      extraPrice: 30000, // 인당 추가가격
      roomCnt: 2, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
      available: false, // 예약 가능 여부
    },
    {
      campsiteId: 1, // 캠핑장 번호
      roomId: 6,
      image: dummy1,
      name: "F구역 (별자리 명소)", // 방 이름
      induty: "글램핑", // 방 유형
      baseNo: 2, // 기본 인원
      maxNo: 4, // 최대 인원
      price: 100000, // 가격
      extraPrice: 30000, // 인당 추가가격
      roomCnt: 2, // 방 개수
      toiletCnt: 1, // 화장실 개수
      supplyList: [], // 부대시설 목록
      available: false, // 예약 가능 여부
    },
  ],
};
