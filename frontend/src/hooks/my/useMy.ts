import { useQuery, useMutation } from '@tanstack/react-query';
import { IEmptyNotificationList, IPageableReq, IPageableMyReivewReq, IMyFavoritCampListResq, IMyReviewListRes } from '@/types/my';
import { fetchFavoriteCamps, fetchMyAlerts, deleteMyAlert, deleteLikes, fetchMyReviews, deleteReview  } from '@/services/my/api';

export const useMy = () => {

  // 내 빈자리 알림 조회
  const useMyAlertsQuery = useQuery<IEmptyNotificationList>({
    queryKey: ['myAlerts'],
    queryFn: fetchMyAlerts,
  });

  // 내 빈자리 알림 삭제
  const useDeleteAlert = useMutation({
    mutationKey: ['deleteAlert'],
    mutationFn: deleteMyAlert,
    onSuccess: () => {
      // 삭제한 후에 남아있는 리스트 댜시 불러오게 함
      useMyAlertsQuery.refetch();
    },
    onError: (error) => {
      console.error('삭제못했음 :', error);
    }
  });

  // 내가 찜한 캠핑장 조회
  const useFavoriteCampsList = (props: IPageableReq) => {
    return useQuery<IMyFavoritCampListResq>({
      queryKey: ['favoriteCamps', props],
      queryFn: () => fetchFavoriteCamps(props),
    });
  };

  // 내가 찜한 캠핑장 "좋아요 취소"
  const useDeleteLike = useMutation({
    mutationKey: ['deleteLikes'],
    mutationFn: (campsiteId: number) => deleteLikes(campsiteId),
    onSuccess: () => {
      console.log('좋아요 취소 성공!!')
    },
    onError: (error) => {
      console.error('좋아요 취소 실패:', error);
    }
  });

  // 내 리뷰 조회
  const useMyReviews = (props: IPageableMyReivewReq) => {
    return useQuery<IMyReviewListRes>({
      queryKey: ['myReviews', props],
      queryFn: () => fetchMyReviews(props),
    });
  };

   // 내 리뷰 삭제
   const useDeleteReview = useMutation({
    mutationKey: ['deleteReview'],
    mutationFn: deleteReview,
    onSuccess: () => {
      console.log('리뷰 삭제 성공!!');
    },
    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
    }
  });


  return {
    useMyAlertsQuery,
    useDeleteAlert,
    useFavoriteCampsList,
    useDeleteLike,
    useMyReviews,
    useDeleteReview,
  };
};
