import { deleteNotify, getNotifyList } from "@/services/notify/api";
import { INotifyReq } from "@/types/notify";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNotify = () => {
  // 전체 알림 조회
  const useGetNotifyList = (props: INotifyReq) => {
    return useQuery({
      queryKey: ["notify", props],
      queryFn: () => getNotifyList(props),
    });
  };

  // 알림 삭제
  const useDeleteNotify = () => {
    return useMutation({
      mutationFn: ({ notificationId }: { notificationId: number }) =>
        deleteNotify(notificationId),
    });
  };

  return { useGetNotifyList, useDeleteNotify };
};
