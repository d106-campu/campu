import MyReservation from '@/components/my/consumer/MyReservation';
import MyReview from '@/components/my/consumer/MyReview';
import MyFavoriteCamp from '@/components/my/consumer/MyFavoriteCamp';
import FreeAlert from '@/components/my/freeAlert/FreeAlert';
import MyProfile from '@/components/my/profile/MyProfile';
import GetReservations from '@/components/my/consumer/MyReservationItem'; // 더미데이터
import GetMyReviews from '@/components/my/consumer/MyReviewItem'; // 더미데이터
import GetMyAlerts from '@/components/my/freeAlert/FreeAlertItem';

interface IConsumerContainerProps {
  selectedComponent: string;
}

const ConsumerContainer = ({
  selectedComponent
}: IConsumerContainerProps): JSX.Element => {
  // 더미 데이터 로드 및 첫 번째 예약 데이터 사용
  const reservations = GetReservations();
  const firstReservation = reservations[0];

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'MyReservation':
        return <MyReservation {...firstReservation}/>;
      case 'MyReview':
        return <MyReview reviews={GetMyReviews.reviews} totalMyReview={GetMyReviews.totalMyReview} />;
      case 'MyFavoriteCamp':
        return <MyFavoriteCamp />;
      case 'FreeAlert':
        return <FreeAlert alerts={GetMyAlerts.alerts} totalMyAlerts={GetMyAlerts.totalMyAlerts}/>;
      case 'MyProfile':
        return <MyProfile />;
      default:
        return <MyReservation {...firstReservation}/>;
    }
  };
  return (
    <div className='w-full min-h-[calc(100vh-3rem)]'>
      {renderComponent()}
    </div>
  );
}

export default ConsumerContainer;