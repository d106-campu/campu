import { getOwnerCampsiteList } from "@/services/owner/api";
import { IOwnerCampsiteReq } from "@/types/owner";
import { useQuery } from "@tanstack/react-query";

export const useOwner = () => {

    const useGetOwnerCampsiteList = (props: IOwnerCampsiteReq) => {
        return useQuery({
            queryKey: ['ownerCampsite', props],
            queryFn: () => getOwnerCampsiteList(props),
        })
    }
  return {useGetOwnerCampsiteList};
};
