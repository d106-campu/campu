// useOwner.ts로 옮긴 후에 지워주세용~

import {
  postCampsiteRoom,
} from "@/services/owner/testapi";
import {
  IRoomCreateReq,
} from "@/types/testOwner";
import { useMutation } from "@tanstack/react-query";

export const testUseOwner = () => {

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

  return { usePostCampsiteRoom };
};
