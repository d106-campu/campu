import { getOwnerCampsiteList, postMapImage, postThumbnailImage } from "@/services/owner/api";
import { ICampsiteMapReq, ICampsiteThumbnailReq, IOwnerCampsiteReq } from "@/types/owner";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOwner = () => {
  // 사장님 캠핑장 조회
  const useGetOwnerCampsiteList = (props: IOwnerCampsiteReq) => {
    return useQuery({
      queryKey: ["ownerCampsite", props],
      queryFn: () => getOwnerCampsiteList(props),
    });
  };
  // 캠핑장 대표 이미지
  const updateThumbnailImage = useMutation({
    mutationFn: (props: ICampsiteThumbnailReq) => postThumbnailImage(props),
    onSuccess: () => {
      console.log("대표이미지 바꿈");
    },
    onError: (error) => {
      console.error("대표이미지 못바꿈", error);
    },
  });
    // 캠핑장 배치도 이미지
    const updateMapImage = useMutation({
      mutationFn: (props: ICampsiteMapReq) => postMapImage(props),
      onSuccess: () => {
        console.log("배치도 이미지 바꿈");
      },
      onError: (error) => {
        console.error("배치도 이미지 못바꿈", error);
      },
    });
  return { useGetOwnerCampsiteList, updateThumbnailImage, updateMapImage };
};
