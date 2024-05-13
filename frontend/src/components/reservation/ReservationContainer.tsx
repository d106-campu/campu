import Lottie from "react-lottie";
import RoomItem from "@/components/reservation/RoomItem";
import MyController from "@/components/reservation/MyController";
import Loading from "@/components/@common/Loading/Loading";
import useIntersectionObserver from "@/hooks/@common/useIntersectionObserver";
import { useReservation } from "@/hooks/reservation/useReservation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { tentOptions } from "@/assets/lotties/lottieOptions";

const ReservationContainer = ({ campsiteId }: { campsiteId: number }) => {
  // Redux 상태 불러오기
  const { headCount } = useSelector((state: RootState) => state.headCount);
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  // 방 목록 조회 (무한 스크롤)
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

  // 무한스크롤 감지
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
          {isLoading && <Loading />}
          {roomListData?.pages ? (
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
                  <p className="text-sm text-SUB_BLACK">
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
