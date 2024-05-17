import MyReservation from "@/components/my/consumer/MyReservation";
import MyReview from "@/components/my/consumer/MyReview";
import MyFavoriteCamp from "@/components/my/consumer/MyFavoriteCamp";
import FreeAlert from "@/components/my/freeAlert/FreeAlert";
import MyProfile from "@/components/my/profile/MyProfile";
import { useUser } from "@/hooks/user/useUser";

interface IConsumerContainerProps {
  selectedComponent: string;
}

const ConsumerContainer = ({
  selectedComponent,
}: IConsumerContainerProps): JSX.Element => {
  const { userProfileQuery } = useUser();
  const profileData = userProfileQuery.data?.data.myProfile;
  const nickname = profileData?.nickname || "닉네임 없음";

  const renderComponent = () => {
    switch (selectedComponent) {
      case "MyReservation":
        return <MyReservation />;
      case "MyReview":
        return <MyReview />;
      case "MyFavoriteCamp":
        return <MyFavoriteCamp nickname={nickname}/>;
      case "FreeAlert":
        return <FreeAlert nickname={nickname}/>;
      case "MyProfile":
        return <MyProfile phoneVerified={false} />;
      default:
        return <MyReservation />;
    }
  };
  return <div className="w-full">{renderComponent()}</div>;
};

export default ConsumerContainer;
