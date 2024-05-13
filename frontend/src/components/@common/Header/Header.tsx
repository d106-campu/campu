import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setIsLogin } from '@/features/login/authSlice';
import logo from "@/assets/images/temp_log2.png";
import profileDefaultImage from "@/assets/images/profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLink from "@/components/@common/HeaderLink/HeaderLink";
import AlertLink from "@/components/alert/AlertLink ";
import { useUser } from '@/hooks/user/useUser';
import Toast from '@/components/@common/Toast/Toast';

// @TODO: 로그인 여부 구분
// @TODO: 알림 열기
const Header = ({ page }: { page?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const { userProfileQuery } = useUser();
  const profileData = userProfileQuery.data?.data.myProfile;
  const [profileImageUrl, setProfileImageUrl] = useState(profileDefaultImage);
  const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL_PROD;

  // 프로필이미지 추출
  useEffect(() => {
    if (profileData?.profileImageUrl) {
      const fullImageUrl = `${imageBaseURL}${profileData.profileImageUrl}`;
      setProfileImageUrl(fullImageUrl);
      // console.log("이미지 주소 확인:", fullImageUrl);
    }
  }, [profileData, imageBaseURL]);
  
  const handleLogout = () => {
    console.log("로그아웃 딸깍!!")
    localStorage.removeItem('accessToken');
    Toast.success('로그아웃 되었습니다 !');
    dispatch(setIsLogin(false));
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const isCurrentPage = (location: string, target: string) => {
    if (location.includes(target)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`flex justify-between items-center w-full h-14 p-5 px-10 ${
        page === "login" ? "bg-white/0 fixed top-0 left-0 z-10 text-white" : ""
      } ${
        page === "main" ? " bg-white/80 z-10" : ""
      }`}
    >
      <img src={logo} alt="logo" className="w-24 cursor-pointer" />
      <div className="grid grid-cols-5 flex-grow max-w-2xl">
        <HeaderLink
          label="홈"
          link="/"
          isClicked={isCurrentPage(location.pathname, "main")}
          page={page}
        />
        <HeaderLink
          label="캠핑장 찾기"
          link="/search"
          isClicked={isCurrentPage(location.pathname, "search")}
          page={page}
        />
        <HeaderLink
          label="마이페이지"
          link="/my"
          isClicked={isCurrentPage(location.pathname, "my")}
          page={page}
        />
        <HeaderLink
          label="캠핑장 관리"
          link="/owner"
          isClicked={isCurrentPage(location.pathname, "owner")}
          page={page}
        />

        {/* 알림 */}
        {/* @TODO: SSE 알림 여부 구분*/}
        <AlertLink hasAlert={true} page={page}/>
      </div>
      <div className="p-1 pl-2 flex items-center">
        {isLogin ? (
          <>
            <span
              className="text-sm p-2 cursor-pointer rounded-md mr-5 hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
              onClick={handleLogout}>
              로그아웃
            </span>
            <img
              src={profileImageUrl || profileDefaultImage}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </>
        ) : (
          <>
            <span
              className="text-sm p-2 cursor-pointer rounded-md mr-5 hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
              onClick={handleLoginRedirect}
            >
              로그인
            </span>
            <img
              src={profileDefaultImage}
              alt="default profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
