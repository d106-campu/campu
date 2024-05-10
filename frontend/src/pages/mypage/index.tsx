import { useSelector } from 'react-redux';
import Header from "@/components/@common/Header/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import Footer from "@/components/@common/Footer/Footer";
import MySideBar from "@/components/my/MySideBar";
import ConsumerContainer from "@/components/my/ConsumerContainer";
import { RootState } from '@/app/store';

const MyPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const selectedComponent = useSelector((state: RootState) => state.selectedComp.value);

  // "로그인" 상태가 아니라면 리다이렉트 전 "경로 저장" 후 로그인 페이지로 이동
  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { state: { from: location } });
    }
  }, [isLogin, navigate, location]);

  return (
    <div className='w-screen'>
      <Header />
      <div className="w-screen h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-[75%] flex">
          <MySideBar
            selectedComponent={selectedComponent}
          />
          {/* 구분선 */}
          <div className="flex-grow-0 flex-shrink-0 w-[2%] border-r-[1px] mr-10 mb-10" />
          <ConsumerContainer selectedComponent={selectedComponent}/>
        </div>
      </div>
    </div>
  )
};

export default MyPage;
