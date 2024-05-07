import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import profileDefaultImage  from "@/assets/images/profile.png";
import Button from "../@common/Button/Button";;
import { setSelectedComp } from '@/features/mypage/componentSlice';

interface IMySideBarProps {
  // onComponentChange: (componentName: string) => void;
  selectedComponent: string;
}

const MySideBar = ({
  // onComponentChange,
  selectedComponent
}:IMySideBarProps): JSX.Element => {
  const dispatch = useDispatch();
  const profileImage = useSelector((state: RootState) => state.profileImage.isProfileImage); // 프로필이미지 스토어에서 꺼내오기

  const handleComponentChange = (componentName: string) => {
    dispatch(setSelectedComp(componentName));
  };

  const sideItem: Array<{ name: string, component: string }> = [
    { name: '예약 내역', component: 'MyReservation'},
    { name: '내가 쓴 리뷰', component: 'MyReview'},
    { name: '내가 찜한 캠핑장', component: 'MyFavoriteCamp'},
    { name: '빈자리 알림', component: 'FreeAlert'},
    { name: '프로필 설정', component: 'MyProfile'},
  ]

  return (
    <div>
      <div className="h-[200px] flex flex-col items-center py-5">
        <img
          src={profileImage || profileDefaultImage}
          alt="프사"
          className="border-2 w-[125px] h-[125px] object-cover object-center rounded-full"
        />
        <h1 className="text-lg pt-2">유저 닉네임</h1>
      </div>
      <div className="flex flex-col py-5 text-GRAY ">
        {sideItem.map(item => (
          <div key={item.component} className="py-2">
            <Button
              type='button'
              text={item.name}
              textSize='text-md'
              hoverTextColor="hover:text-MAIN_GREEN"
              backgroundColor={selectedComponent === item.component ? "bg-SUB_GREEN_01" : "bg-white"}
              textColor={selectedComponent === item.component ? "text-MAIN_GREEN" : "text-GRAY"}
              hoverBackgroundColor="hover:bg-SUB_GREEN_01"
              fontWeight="none"
              onClick={() => handleComponentChange(item.component)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MySideBar;