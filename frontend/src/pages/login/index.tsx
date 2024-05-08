import { useState, useEffect } from "react";
import Button from '@/components/@common/Button/Button';
import LoginForm from '@/components/login/LoginForm';
import SignUpForm from '@/components/signup/SignUpForm';
import BG_Login from '@/assets/images/bg_loginG.jpg';
import Header from "@/components/@common/Header/Header";
import Certification from "@/components/signup/Certification";
import PasswordRecoveryModal from "@/components/login/FindPWD";

const LoginPage = (): JSX.Element => {
  const [isSignUpActive, setIsSignUpActive] = useState<boolean>(false); // 회원가입 폼인지 로그인 폼인지에 대한 상태 관리
  const [zIndexChangeDelay, setZIndexChangeDelay] = useState<boolean>(false); // z-index 값에 대한 상태 관리
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // 화면 크기에 대한 상태 관리
  const [certificationModal, setCertificationModal] = useState<boolean>(false); // 인증 모달 상태 관리
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false); // 인증 성공 상태 관리 
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // 사용자가 입력한 휴대폰 번호 전달 상태 관리
  const [isFindpwdModal, setIsFindpwdModalOpen] = useState<boolean>(false); // 비밀번호 찾기 모달 상태 관리

  // 토글을 통해서 회원가입 & 로그인 좌우 이동, 활성화 여부 체크
  const toggleForms = (): void => {
    setIsSignUpActive(!isSignUpActive);
    setZIndexChangeDelay(true); 
    setTimeout(() => {
      setZIndexChangeDelay(false);
      resetPhoneVerification(); // 폼 전환 시 인증 상태 초기화
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

  // 인증번호 검증 함수
  const handleVerify = (verified: boolean) => {
    // @TODO : 백엔드 API 통신 로직 필요 -> 인증 성공, 실패 판별 후 SignUpForm으로 전달해야함
    setPhoneVerified(verified)
    console.log("인증번호 검증 확인 :", verified ? "인증 성공!" : "인증 실패!");
    setCertificationModal(false); // 모달 닫기
  };

  // 인증 초기화 함수
  const resetPhoneVerification = () => {
    setPhoneVerified(false);
  };

  const openFindpwdModal = () => setIsFindpwdModalOpen(true); // 비밀번호 찾기 모달 열기
  const closeFindpwdModal = () => setIsFindpwdModalOpen(false); // 비밀번호 찾기 모달 닫기
  const openCertificationModal = (phone: string) => {
    setCertificationModal(true);
    setPhoneNumber(phone)
  }; // 휴대전화 인증 모달 열기
  const closeCertificationModal = () => {setCertificationModal(false);}; // 휴대전화 인증 모달 닫기

  // 창 크기에 따른 Form 반응시키기
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);  // 윈도우의 너비가 640px 미만인지 확인
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      resetPhoneVerification(); // 컴포넌트 언마운트 시 인증 상태 초기화
    };
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
          <div className='min-w-[300px] h-[50vh] flex-grow flex justify-around px-16 items-center'>
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
              <SignUpForm
                isSmallScreen={isSmallScreen}
                toggleForm={toggleForms}
                openCertificationModal={openCertificationModal}
                closeCertificationModal={closeCertificationModal}
                phoneVerified={phoneVerified}
                resetPhoneVerification={resetPhoneVerification}
              /> :
              <LoginForm
                isSmallScreen={isSmallScreen}
                toggleForm={toggleForms}
                openFindpwdModal={openFindpwdModal}
              />}
            </div>
          </div>
        </div>
      </div>
      {/* 휴대전화 인증 관련 모달 렌더링 */}
      {certificationModal && (
        <Certification 
          isOpen={certificationModal}
          onClose={closeCertificationModal}
          phone={phoneNumber}
          onVerify={handleVerify}
        />
      )}
      {/* 비밀번호 찾기 모달 렌더링 */}
      {isFindpwdModal && (
        <PasswordRecoveryModal
          isOpen={isFindpwdModal}
          onClose={closeFindpwdModal}
        />
      )}
    </>
  );
};

export default LoginPage;