import {
  getOwnerCampsiteList,
  getOwnerReservationList,
  postBizrno,
} from "@/services/owner/api";
import {
  IBizrnoReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
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
  return { useGetOwnerCampsiteList, useAddBizrno, useGetReservationList };
};
