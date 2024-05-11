import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteCamps } from '@/services/myFavorites/api';
import { IPageableReq, IMyFavoritCampListRes } from '@/types/myFavorite';

export const useMyFavorites = () => {
  const useFavoriteCampsList = (props: IPageableReq) => {
    return useQuery<IMyFavoritCampListRes>({
      queryKey: ['favoriteCamps', props],
      queryFn: () => fetchFavoriteCamps(props),
    });
  };

  return { useFavoriteCampsList };
};
