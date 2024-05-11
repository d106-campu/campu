import RoomItem from "@/components/reservation/RoomItem";
import MyController from "@/components/reservation/MyController";
import { useReservation } from "@/hooks/reservation/useReservation";
import useIntersectionObserver from "@/hooks/@common/useIntersectionObserver";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Lottie from "react-lottie";
import {
  roomsLoadingOptions,
  tentOptions,
} from "@/assets/lotties/lottieOptions";

const ReservationContainer = ({ campsiteId }: { campsiteId: number }) => {
  // Redux 상태 불러오기
  const { headCount } = useSelector((state: RootState) => state.headCount);
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  const { useGetRoomListInfinite } = useReservation();
  const {
    data: roomListData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetRoomListInfinite({
    campsiteId: campsiteId,
    size: 5,
    headCnt: headCount,
    startDate: startDate,
    endDate: endDate,
  });

  const { setTarget } = useIntersectionObserver({ fetchNextPage, hasNextPage });

  const totalElements =
    roomListData?.pages[0]?.data.roomList.totalElements || 0;

  return (
    <>
      {/* 캠핑존 둘러보기 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold pb-5">
          캠핑존 둘러보기&nbsp;
          <span className="text-xl font-bold text-[#46A14F]">
            {totalElements}
          </span>
        </h3>
        <MyController />
        <div className="w-[95%] mx-auto">
          {/* 로딩중 UI */}
          {isLoading ? (
            <div className="pt-10 text-center">
              <p className="text-MAIN_GREEN text-lg font-semibold">로딩 중</p>
              <p className="text-xs text-SUB_BLACK">잠시만 기다려 주세요</p>
              <Lottie options={roomsLoadingOptions} height={90} width={200} />
            </div>
          ) : roomListData?.pages ? (
            <>
              {/* 각 방에 대한 RoomItem 렌더링 */}
              {roomListData.pages.map((item) =>
                item.data.roomList.content.map((room) => (
                  <RoomItem key={room.id} room={{ ...room }} />
                ))
              )}
            </>
          ) : (
            <>
              {/* 검색결과가 없을 때 UI */}
              <div className="pt-10 flex items-center justify-center gap-10">
                <div>
                  <Lottie options={tentOptions} height={200} width={300} />
                </div>
                <div className="text-center">
                  <p className="text-lg text-MAIN_GREEN font-semibold">
                    조건에 맞는 캠핑존이 없습니다 😥
                  </p>
                  <p className="text-xs text-SUB_BLACK">
                    다른 조건으로 검색해 보세요
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
        <div ref={setTarget} className="h-[1rem]" />
      </div>
    </>
  );
};
export default ReservationContainer;

// // 더미 이미지
// import dummy1 from "@/assets/images/dummy/camping_spot_6.png";
// import dummy2 from "@/assets/images/dummy/camping_spot_1.png";
// import dummy3 from "@/assets/images/dummy/camping_spot_2.png";
// import dummy4 from "@/assets/images/dummy/camping_spot_3.png";
// import dummy5 from "@/assets/images/dummy/camping_spot_4.jpg";

// // 더미 데이터
// const data = {
//   content: [
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 1,
//       image: dummy1,
//       name: "A구역 (벚꽃 캠핑존)", // 방 이름
//       induty: "텐트", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 6, // 최대 인원
//       price: 60000, // 가격
//       extraPrice: 20000, // 인당 추가가격
//       roomCnt: 2, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: [], // 부대시설 목록
//       available: true, // 예약 가능 여부
//     },
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 2,
//       image: dummy2,
//       name: "B구역 (마운틴뷰)", // 방 이름
//       induty: "오토캠핑", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 4, // 최대 인원
//       price: 80000, // 가격
//       extraPrice: 20000, // 인당 추가가격
//       roomCnt: 1, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
//       available: true, // 예약 가능 여부
//     },
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 3,
//       image: dummy3,
//       name: "C구역 (별자리 명소)", // 방 이름
//       induty: "카라반", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 4, // 최대 인원
//       price: 100000, // 가격
//       extraPrice: 30000, // 인당 추가가격
//       roomCnt: 2, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: [
//         "개별 바베큐장",
//         "파쇄석",
//         "텐트 옆 주차",
//         "개별 바베큐장",
//         "파쇄석",
//         "텐트 옆 주차",
//         "개별 바베큐장",
//         "개별 바베큐장",
//       ], // 부대시설 목록
//       available: true, // 예약 가능 여부
//     },
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 4,
//       image: dummy4,
//       name: "D구역 (별자리 명소)", // 방 이름
//       induty: "카라반", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 5, // 최대 인원
//       price: 100000, // 가격
//       extraPrice: 30000, // 인당 추가가격
//       roomCnt: 2, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
//       available: false, // 예약 가능 여부
//     },
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 5,
//       image: dummy5,
//       name: "E구역 (별자리 명소)", // 방 이름
//       induty: "카라반", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 4, // 최대 인원
//       price: 100000, // 가격
//       extraPrice: 30000, // 인당 추가가격
//       roomCnt: 2, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: ["개별 바베큐장", "파쇄석", "텐트 옆 주차"], // 부대시설 목록
//       available: false, // 예약 가능 여부
//     },
//     {
//       campsiteId: 1, // 캠핑장 번호
//       roomId: 6,
//       image: dummy1,
//       name: "F구역 (별자리 명소)", // 방 이름
//       induty: "글램핑", // 방 유형
//       baseNo: 2, // 기본 인원
//       maxNo: 4, // 최대 인원
//       price: 100000, // 가격
//       extraPrice: 30000, // 인당 추가가격
//       roomCnt: 2, // 방 개수
//       toiletCnt: 1, // 화장실 개수
//       supplyList: [], // 부대시설 목록
//       available: false, // 예약 가능 여부
//     },
//   ],
// };
