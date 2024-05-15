import { getOwnerCampsiteList, postBizrno } from "@/services/owner/api";
import { IBizrnoReq, IOwnerCampsiteReq } from "@/types/owner";
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
  return { useGetOwnerCampsiteList, useAddBizrno };
};
