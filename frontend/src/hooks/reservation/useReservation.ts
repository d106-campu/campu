import {
  deleteAlert,
  getRoomList,
  postAlert,
  getCapmsite,
} from "@/services/reservation/api";
import { IAlertPostReq, IRoomListReq } from "@/types/reservation";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useReservation = () => {
  // 방 목록 조회 (무한 스크롤)
  const useGetRoomListInfinite = (props: IRoomListReq) => {
    return useInfiniteQuery({
      queryKey: ["rooms", props],
      queryFn: ({ pageParam }) => {
        return getRoomList({ ...props, page: pageParam });
      },
      initialPageParam: 0, // 페이지는 0부터 시작하도록 설정
      getNextPageParam: (lastPage) => {
        const { last, number } = lastPage.data.roomList;
        return last ? undefined : number + 1;
      },
      enabled: !!props.startDate && !!props.endDate && !!props.headCnt, // 날짜와 인원수가 유효할 때만 쿼리 활성화
    });
  };

  // 빈자리 알림 등록
  const usePostAlert = (props: IAlertPostReq) => {
    return useMutation({
      mutationKey: [`room alert`, props],
      mutationFn: (props: IAlertPostReq) => postAlert(props),
    });
  };

  // 빈자리 알림 취소
  const useDeleteAlert = () => {
    return useMutation({
      mutationKey: [`room alert delete`],
      mutationFn: (roomId: number) => deleteAlert(roomId),
    });
  };

  // 캠핑장 상세 조회
  const useGetCampsite = (campsiteId: number, isLogin: boolean) => {
    return useQuery({
      queryKey: ["campsite detail", campsiteId],
      queryFn: () => getCapmsite(campsiteId, isLogin),
      enabled: !!campsiteId, // campsiteId가 유효할 때만 쿼리 실행
    });
  };

  return {
    useGetRoomListInfinite,
    usePostAlert,
    useDeleteAlert,
    useGetCampsite,
  };
};
