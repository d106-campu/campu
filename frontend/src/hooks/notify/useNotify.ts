import { getNotifyList } from "@/services/notify/api";
import { INotifyReq } from "@/types/notify";
import { useQuery } from "@tanstack/react-query";

export const useNotify = () => {
  // 전체 알림 조회
  const useNotify = (props: INotifyReq) => {
    return useQuery({
      queryKey: ["notify", props],
      queryFn: () => getNotifyList(props),
    });
  };
  return { useNotify };
};
