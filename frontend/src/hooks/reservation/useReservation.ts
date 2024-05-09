import { getRoomList } from "@/services/reservation/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReservation = () => {
  const useGetRoomListInfinite = (props: {
    campsiteId: number;
    size: number;
    headCnt: number;
    startDate: string;
    endDate: string;
  }) => {
    return useInfiniteQuery({
      queryKey: [
        "rooms",
        props.campsiteId,
        props.size,
        props.headCnt,
        props.startDate,
        props.endDate,
      ],
      queryFn: ({ pageParam }) => {
        return getRoomList({ ...props, page: pageParam });
      },
      initialPageParam: 0, // 페이지는 0부터 시작하도록 설정
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지면 더 이상 페이지를 요청하지 않음
        if (lastPage.data.roomList.last) return;

        // 다음 페이지 번호 계산
        return allPages.length + 1;
      },
    });
  };

  return { useGetRoomListInfinite };
};
