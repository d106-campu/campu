import {
  getOwnerCampsiteList,
  getOwnerReservationList,
  postBizrno,
  postCampsiteRoom,
} from "@/services/owner/api";
import {
  IBizrnoReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IRoomCreateReq,
} from "@/types/owner";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOwner = () => {
  const useGetOwnerCampsiteList = (props: IOwnerCampsiteReq) => {
    return useQuery({
      queryKey: ["ownerCampsite", props],
      queryFn: () => getOwnerCampsiteList(props),
    });
  };

  // 사업자번호 등록
  const useAddBizrno = (props: IBizrnoReq) => {
    return useMutation({
      mutationFn: () => postBizrno(props),
    });
  };

  // 캠핑장 예약 내역 조회
  const useGetReservationList = (props: IOwnerReservationReq) => {
    return useQuery({
      queryKey: ["ownerReservation", props],
      queryFn: () => getOwnerReservationList(props),
    });
  };

  // 캠핑장 방 등록
  const usePostCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["postCampRoom"],
      // mutationFn: postCampsiteRoom,
      mutationFn: ({ file, createRequestDto }: { file: File, createRequestDto: IRoomCreateReq }) =>
        postCampsiteRoom(file, createRequestDto),
      onSuccess: (res) => {
        console.log("캠핑장 방 등록 성공", res);
      },
      onError: (err) => {
        console.error("캠핑장 방 등록 실패", err);
      },
    });
  };

  return { useGetOwnerCampsiteList, useAddBizrno, useGetReservationList, usePostCampsiteRoom };
};
