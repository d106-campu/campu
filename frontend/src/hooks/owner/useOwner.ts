import {
  getOwnerCampsiteList,
  getOwnerReservationList,
  postBizrno,
  updateAddImage,
  updateMapImage,
  updateThumnailImage,
  postCampsiteRoom,
} from "@/services/owner/api";
import {
  IBizrnoReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IRoomCreateReq,
} from "@/types/owner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOwner = () => {
  // 사장님 캠핑장 조회
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

  // 캠핑장 대표사진
  const useThumbnailMutation = (campsiteId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["thumbnailImage", campsiteId],
      mutationFn: (file: File) => updateThumnailImage(campsiteId, file),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["campsite detail", campsiteId],
        });
        console.log("대표사진 변경");
      },
      onError: (err) => {
        console.log(err, "사진 변경 실패");
      },
    });
  };

  // 캠핑장 배치도사진
  const useMapImageMutation = (campsiteId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["mapImage", campsiteId],
      mutationFn: (file: File) => updateMapImage(campsiteId, file),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["campsite detail", campsiteId],
        });
        console.log("배치도 사진 변경");
      },
    });
  };

  // 캠핑장 일반 사진
  const useAddImageMutation = (campsiteId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["mapImage", campsiteId],
      mutationFn: (file: File[]) => updateAddImage(campsiteId, file),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["campsite detail", campsiteId],
        });
        console.log("배치도 사진 변경");
      },
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

  return {
    useGetOwnerCampsiteList,
    useAddBizrno,
    useGetReservationList,
    useThumbnailMutation,
    useMapImageMutation,
    useAddImageMutation,
    usePostCampsiteRoom,
  };
};
