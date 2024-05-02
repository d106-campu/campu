import ReservationItem from "@/components/payment/ReservationItem";

const PaymentContainer = () => {
  return (
    <div className="w-[60%] mx-auto py-10">
      <ReservationItem data={data} />
    </div>
  );
};
export default PaymentContainer;

// 더미 데이터
import dummy1 from "@/assets/images/dummy/camping_spot_6.png";
const data = {
  id: 1, // 예약 아이디
  image: dummy1,
  campsite_faclt_nm: "캠프유캠푸 캠핑장",
  campsite_tel: "010-1234-5678",
  campsite_addr1: "경상북도 칠곡군 가산면 금화리 산 49-1",
  campsite_addr2: "캠프유캠푸 캠핑장",
  roomName: "A구역 (벚꽃캠핑존) 10",
  roomInduty: "카라반",
  supplyList: ["파쇄석", "개별 바베큐장", "텐트 옆 주차"],
  headCnt: 3,
  price: 150000,
  startDate: "2024-05-10",
  endDate: "2024-05-14",
  checkIn: "14:00",
  checkOut: "11:00",
};
