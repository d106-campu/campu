import MyReservation from '@/components/my/consumer/MyReservation';
import MyReview from '@/components/my/consumer/MyReview';
import MyFavoriteCamp from '@/components/my/consumer/MyFavoriteCamp';
import FreeAlert from '@/components/my/consumer/FreeAlert';
import MyProfile from '@/components/my/consumer/MyProfile';

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
        return <MyProfile />;
      default:
        return <MyReservation />;
    }
  };
  return (
    <div className='w-full h-auto'>
      {renderComponent()}
    </div>
  );
}

export default ConsumerContainer;