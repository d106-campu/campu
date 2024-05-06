import ReservationItem from "@/components/payment/ReservationItem";

const PaymentContainer = () => {
  return (
    <div className="w-[60%] mx-auto pt-5 pb-14">
      <ReservationItem />
    </div>
  );
};
export default PaymentContainer;

// type reservationStatusType = "proceeding" | "complete";

// // 더미 데이터
// import dummy1 from "@/assets/images/dummy/camping_spot_6.png";
// const data = {
//   id: 1, // 예약 아이디
//   image: dummy1, // 방 사진
//   campsite_faclt_nm: "캠프유캠푸 캠핑장", // 캠핑장 이름
//   campsite_tel: "010-1234-5678", // 캠핑장 전화번호
//   campsite_addr1: "경상북도 칠곡군 가산면 금화리 산 49-1", // 캠핑장 주소
//   campsite_addr2: "캠프유캠푸 캠핑장", // 캠핑장 상세 주소
//   roomName: "A구역 (벚꽃캠핑존) 10", // 캠핑장 방 이름
//   roomInduty: "카라반", // 캠핑 유형
//   supplyList: ["파쇄석", "개별 바베큐장", "텐트 옆 주차"],
//   headCnt: 3, // 예약 인원
//   price: 150000, // 총 가격
//   startDate: "2024-05-10", // 캠핑 시작일
//   endDate: "2024-05-14", // 캠핑 종료일
//   checkIn: "14:00", // 캠핑장 입실 시간
//   checkOut: "11:00", // 캠핑장 퇴실 시간
//   status: "proceeding" as reservationStatusType, // 예약 상태 (예약 진행 중 : "proceeding" | 예약 완료 :"complete")
// };
