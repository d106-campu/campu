import { useState, useEffect } from "react";
import Button from '@/components/@common/Button/Button';
import LoginForm from '@/components/login/LoginForm';
import SignUpForm from '@/components/signup/SignUpForm';
import BG_Login from '@/assets/images/bg_loginG.jpg';
import Header from "@/components/@common/Header/Header";

const LoginPage = (): JSX.Element => {
  const [isSignUpActive, setIsSignUpActive] = useState<boolean>(false);
  const [zIndexChangeDelay, setZIndexChangeDelay] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); 

  // 토글을 통해서 회원가입 & 로그인 좌우 이동, 활성화 여부 체크
  const toggleForms = (): void => {
    setIsSignUpActive(!isSignUpActive);
    setZIndexChangeDelay(true); 
    setTimeout(() => {
      setZIndexChangeDelay(false);
    }, 300);
  };

  // 로그인 페이지만 따로 다른 배경 설정
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: `url(${BG_Login})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
  };

  // 창 크기에 따른 Form 반응시키기
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);  // 윈도우의 너비가 640px 미만인지 확인
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <Header />
      <div style={backgroundImageStyle} className='w-screen h-[calc(100vh-3rem)] flex items-center justify-center'>       
        {/* 밑판 */}
        <div
          className='w-[70%] min-w-[600px] sm:min-w-[640px] md:min-w-[700px] lg:min-w-[800px]
          absolute flex items-center justify-ceter bg-white rounded-3xl shadow-2xl bg-opacity-40'
        >
          <div className='min-w-[300px] h-[50vh] flex-1 flex justify-around px-16 items-center'>
            {/* 왼쪽 */}
            <div
              className={`flex flex-col items-center justify-center text-lg transition-transform duration-100 ${
                zIndexChangeDelay || isSignUpActive ?
                'z-0 translate-x-0' :
                `z-10 translate-x-28 sm:-translate-x-20 md:-translate-x-12 lg:translate-x-0 ${isSmallScreen ? 'opacity-0' : 'opacity-100'}`
              }`}>
              <h1 className="py-5 text-lg">아직 계정이 없으신가요?</h1>
              <Button
                text='회원가입'
                textSize='text-[15px]'
                borderRadius='rounded-md'
                padding="px-6 py-2"
                onClick={toggleForms}       
              />
            </div>
            {/* 오른쪽 */}
            <div
              className={`flex flex-col items-center justify-center text-lg transition-transform ${
                zIndexChangeDelay || !isSignUpActive ?
                'z-0 translate-x-0' :
                `z-10 sm:translate-x-20 md:translate-x-16 lg:translate-x-0 ${isSmallScreen ? 'opacity-0' : 'opacity-100'}`
              }`}>
              <h1 className='py-5 text-lg'>이미 계정이 있으신가요?</h1>
              <Button
                text='로그인'
                textSize='text-[15px]'
                borderRadius='rounded-md'
                padding="px-6 py-2"
                onClick={toggleForms}       
              />
            </div>
          </div>
        </div>
        
        {/* 왼쪽 회원가입 폼 + 오른쪽 로그인 폼 */}
        <div
          className={`w-full flex items-center justify-center transition-transform ease-in-out duration-700 ${
            isSignUpActive ?
            '-translate-x-0 sm:-translate-x-32 md:-translate-x-40 lg:-translate-x-64' :
            'translate-x-0 sm:translate-x-32 md:translate-x-40 lg:translate-x-64'
          }`}>
          <div
            className='min-w-[460px] flex items-center justify-center'>
            <div className='w-full'>
              {isSignUpActive ?
              <SignUpForm isSmallScreen={isSmallScreen} toggleForm={toggleForms}/> :
              <LoginForm isSmallScreen={isSmallScreen} toggleForm={toggleForms}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;