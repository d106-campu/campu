import MyReservation from '@/components/my/consumer/MyReservation';
import MyReview from '@/components/my/consumer/MyReview';
import MyFavoriteCamp from '@/components/my/consumer/MyFavoriteCamp';
import FreeAlert from '@/components/my/consumer/FreeAlert';
import MyProfile from '@/components/my/consumer/MyProfile';
import GetReservations from '@/components/my/consumer/MyReservationItem'; 

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
        return <MyReview />;
      case 'MyFavoriteCamp':
        return <MyFavoriteCamp />;
      case 'FreeAlert':
        return <FreeAlert />;
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