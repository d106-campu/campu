import { useQuery, useMutation } from '@tanstack/react-query';
import { IEmptyNotificationList } from '@/types/myFreeAlert';
import { fetchMyAlerts, deleteMyAlert  } from '@/services/myAlerts/api';

export const useMyAlerts = () => {

  // 내 빈자리 알림 조회
  const myAlertsQuery = useQuery<IEmptyNotificationList>({
    queryKey: ['myAlerts'],
    queryFn: fetchMyAlerts,
  });

  // 내 빈자리 알림 삭제
  const deleteAlertMutation = useMutation({
    mutationKey: ['deleteAlert'],
    mutationFn: deleteMyAlert,
    onSuccess: () => {
      // 삭제한 후에 남아있는 리스트 댜시 불러오게 함
      myAlertsQuery.refetch();
    },
    onError: (error) => {
      console.error('삭제못했음 :', error);
    }
  });

  return {
    myAlertsQuery,
    deleteAlertMutation
  };
};
