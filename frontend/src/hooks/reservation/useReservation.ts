import { getRoomList, postAlert } from "@/services/reservation/api";
import { IAlertReq } from "@/types/reservation";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export const useReservation = () => {
  // 방 목록 조회 (무한 스크롤)
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
        if (lastPage.data.roomList.last) return undefined; // 쿼리를 더 이상 진행하지 않음

        // 다음 페이지 번호 계산
        return allPages.length + 1;
      },
      enabled: !!props.startDate && !!props.endDate && !!props.headCnt, // 날짜와 인원수가 유효할 때만 쿼리 활성화
    });
  };

  // 빈자리 알림 등록
  const usePostAlert = ({ roomId, startDate, endDate }: IAlertReq) => {
    return useMutation({
      mutationKey: [`${roomId} room: ${startDate}-${endDate} Alert`, roomId],
      mutationFn: ({ roomId, startDate, endDate }: IAlertReq) =>
        postAlert({ roomId, startDate, endDate }),
    });
  };

  // 빈자리 알림 취소

  return { useGetRoomListInfinite, usePostAlert };
};
