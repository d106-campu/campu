import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPageableReq, IMyFavoritCampListRes } from '@/types/myFavorite';

// 내가 찜한 캠핑장 조회
export const fetchFavoriteCamps = async ({
  pageable
}: IPageableReq): Promise<IMyFavoritCampListRes> => {
  const response = await axiosAuthInstance.get<APIResponse<IMyFavoritCampListRes>>(`/mypage/campsite`, {
    params: {
      ...pageable
    },
  });
  return response.data.data;
};
