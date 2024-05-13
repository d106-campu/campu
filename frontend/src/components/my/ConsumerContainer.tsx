import MyReservation from '@/components/my/consumer/MyReservation';
import MyReview from '@/components/my/consumer/MyReview';
import MyFavoriteCamp from '@/components/my/consumer/MyFavoriteCamp';
import FreeAlert from '@/components/my/freeAlert/FreeAlert';
import MyProfile from '@/components/my/profile/MyProfile';

interface IConsumerContainerProps {
  selectedComponent: string;
}

const ConsumerContainer = ({
  selectedComponent
}: IConsumerContainerProps): JSX.Element => {


  const renderComponent = () => {
    switch (selectedComponent) {
      case 'MyReservation':
        return <MyReservation />;
      case 'MyReview':
        return <MyReview />;
      case 'MyFavoriteCamp':
        return <MyFavoriteCamp />;
      case 'FreeAlert':
        return <FreeAlert />;
      case 'MyProfile':
        return <MyProfile phoneVerified={false}/>;
      default:
        return <MyReservation />;
    }
  };
  return (
    <div className='w-full'>
      {renderComponent()}
    </div>
  );
}

export default ConsumerContainer;