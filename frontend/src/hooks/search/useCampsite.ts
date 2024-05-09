import { getCampsiteReq } from "@/services/search/api";
import { ICampsiteReq } from "@/types/search";
import { useQuery } from "@tanstack/react-query";

export const useCampsite = () => {
  const useCampsiteList = (props: ICampsiteReq) => {
    return useQuery({
      queryKey: ["campsite", props],
      queryFn: () => getCampsiteReq(props),
    });
  };

  return { useCampsiteList };
};
