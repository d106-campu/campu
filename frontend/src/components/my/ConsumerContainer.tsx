import MyReservation from '@/components/my/consumer/MyReservation';
import MyReview from '@/components/my/consumer/MyReview';
import MyFavoriteCamp from '@/components/my/consumer/MyFavoriteCamp';
import FreeAlert from '@/components/my/freeAlert/FreeAlert';
import MyProfile from '@/components/my/profile/MyProfile';
import GetReservations from '@/components/my/consumer/MyReservationItem'; // 예약내역 더미데이터
import GetMyReviews from '@/components/my/consumer/MyReviewItem'; // 내가쓴리뷰 더미데이터
// import { GetMyAlerts } from '@/components/my/freeAlert/FreeAlertItem'; // 빈자리알림 더미데이터 확인 필요할 경우 주석 해제

interface IConsumerContainerProps {
  selectedComponent: string;
}

const ConsumerContainer = ({
  selectedComponent
}: IConsumerContainerProps): JSX.Element => {
  
  const reservations = GetReservations(); // 내 예약내역 더미데이터
  // const myAlerts = GetMyAlerts(); // 더미데이터 확인 필요할 경우 주석 해제
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
        return <FreeAlert />;
      case 'MyProfile':
        return <MyProfile phoneVerified={false}/>;
      default:
        return <MyReservation {...firstReservation}/>;
    }
  };
  return (
    <div className='w-full'>
      {renderComponent()}
    </div>
  );
}

export default ConsumerContainer;