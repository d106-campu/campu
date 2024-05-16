// useOwner.ts로 옮긴 후에 지워주세용~

import {
  getCampsiteRoomList,
  postCampsiteRoom,
  updateCampsiteRoom,
  deleteCampsiteRoom,
} from "@/services/owner/testapi";
import {
  IRoomCreateReq,
  IOwnerRoomListReq,
  IRoomDeleteReq,
  IRoomUpdateReq,
} from "@/types/testOwner";
import { useMutation, useQuery } from "@tanstack/react-query";

export const testUseOwner = () => {
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

  // 캠핑장 방 수정
  const useUpdateCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["updateCampRoom"],
      mutationFn: (props: IRoomUpdateReq) => updateCampsiteRoom(props),
      onSuccess: (res) => {
        console.log("캠핑장 방 수정함", res);
      },
      onError: (err) => {
        console.error("캠핑장 방 수정함", err);
      },
    });
  };

  // 캠핑장 방 삭제
  const useDeleteCampsiteRoom = () => {
    return useMutation({
      mutationKey: ["deleteCampRoom"],
      mutationFn: (props: IRoomDeleteReq) =>
        deleteCampsiteRoom(props),
      onSuccess: (res) => {
        console.log("캠핑장 방 삭제함", res);
      },
      onError: (err) => {
        console.error("캠핑장 방 삭제 실패함", err);
      },
    });
  };

  return { useCampsiteRoomList, usePostCampsiteRoom, useUpdateCampsiteRoom, useDeleteCampsiteRoom };
};
