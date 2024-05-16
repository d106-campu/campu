import Toast from "@/components/@common/Toast/Toast";
import {
  getOwnerCampsiteList,
  getOwnerReservationList,
  postBizrno,
  updateAddImage,
  updateMapImage,
  updateThumnailImage,
  postCampsiteRoom,
  getCampsiteRoomList,
  updateCampsiteRoom,
  deleteCampsiteRoom,
  updateDatailCampsite,
} from "@/services/owner/api";
import {
  IBizrnoReq,
  IEditDetailReq,
  IOwnerCampsiteReq,
  IOwnerReservationReq,
  IOwnerRoomListReq,
  IRoomCreateReq,
  IRoomDeleteReq,
  IRoomUpdateReq,
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
  // 캠핑장 방 목록 조회
  const useCampsiteRoomList = (props: IOwnerRoomListReq) => {
    return useQuery({
      queryKey: ["campsiteRoomList", props],
      queryFn: () => getCampsiteRoomList(props),
    });
  };

  // 캠핑장 방 등록
  const usePostCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["postCampRoom"],
      // mutationFn: postCampsiteRoom,
      mutationFn: ({
        file,
        createRequestDto,
      }: {
        file: File;
        createRequestDto: IRoomCreateReq;
      }) => postCampsiteRoom(file, createRequestDto),
      onSuccess: (res) => {
        console.log("캠핑장 방 등록 성공", res);
        Toast.success("새로운 방이 등록되었습니다.");
      },
      onError: (err) => {
        console.error("캠핑장 방 등록 실패", err);
        Toast.error("다시 시도해주세요.");
      },
    });
  };

  // 캠핑장 방 수정
  const useUpdateCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["updateCampRoom"],
      mutationFn: (props: IRoomUpdateReq) => updateCampsiteRoom(props),
      onSuccess: (res) => {
        console.log("캠핑장 방 수정함", res);
        Toast.success("방 수정이 완료되었습니다.");
      },
      onError: (err) => {
        console.error("캠핑장 방 수정함", err);
        Toast.error("다시 시도해주세요.");
      },
    });
  };

  // 캠핑장 방 삭제
  const useDeleteCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["deleteCampRoom"],
      mutationFn: (props: IRoomDeleteReq) => deleteCampsiteRoom(props),
      onSuccess: (res) => {
        console.log("캠핑장 방 삭제함", res);
        Toast.success("삭제되었습니다.");
      },
      onError: (err) => {
        console.error("캠핑장 방 삭제 실패함", err);
        Toast.error("다시 시도해주세요.");
      },
    });
  };

  // 캠핑장 상세 수정
  const useUpdateDetail = (props: IEditDetailReq) => {
    return useMutation({
      mutationFn: () => updateDatailCampsite(props),
      onSuccess: (res) => {
        console.log("수정완", res);
        Toast.success("기본 정보가 수정되었습니다.");
        // console.log("확인 1:", props.campsiteId);
        // console.log("확인 2:", props.intro);
        // console.log("확인 3:", props.themeList);
        // console.log("확인 4:", props.fcltyList);
      },
      onError: (err) => {
        console.error("수정실패", err);
        Toast.error("정보 수정에 실패했습니다.");
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
    useCampsiteRoomList,
    useUpdateCampsiteRoom,
    useDeleteCampsiteRoom,
    useUpdateDetail,
  };
};
