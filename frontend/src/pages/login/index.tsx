import { useState } from "react";
import LoginForm from '../../components/login/LoginForm';
import SignUpForm from '../../components/signup/SignUpForm';

const LoginPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [zIndexChangeDelay, setZIndexChangeDelay] = useState(false);

  const toggleForms = () => {
    setIsSignUpActive(!isSignUpActive);
    setZIndexChangeDelay(true); // z-index 변경을 위한 상태 설정
    setTimeout(() => {
      setZIndexChangeDelay(false); // 0.75초 후에 z-index 변경 상태 해제
    }, 250);
  };

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center relative'>       
        {/* 밑판 */}
        <div className='w-[70%] absolute flex items-center justify-center'>
          <div className={`min-w-[300px] h-[40vh] flex-1 flex justify-around items-center shadow-2xl rounded-lg `}>
            <div
              className={`flex flex-col items-center justify-center text-lg ${
                zIndexChangeDelay || isSignUpActive ? 'z-0' : 'z-10'
            }`}>
              <h1 className="py-5">아직 계정이 없으신가요?</h1>
              <button
                onClick={toggleForms}
                className="w-full text-white bg-green-700 hover:bg-green-800 px-6 py-2 rounded-lg"
              >
                회원가입
              </button>
            </div>
            <div
              className={`flex flex-col items-center justify-center text-lg ${
                zIndexChangeDelay || !isSignUpActive ? 'z-0' : 'z-10'}`}
            >
              <h1 className="py-5">이미 계정이 있으신가요?</h1>
              <button
                onClick={toggleForms}
                className="w-full text-white bg-green-700 hover:bg-green-800 px-6 py-2 rounded-lg"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
        
        {/* 왼쪽 회원가입 폼 // 오른쪽 로그인 폼 */}
        <div className={`w-full flex items-center justify-center transition-transform ease-in-out duration-700 ${isSignUpActive ? '-translate-x-72' : 'translate-x-72'}`}>
          <div className='min-w-[450px] flex items-center justify-center'>
            <div className="w-full">
              {isSignUpActive ? <SignUpForm /> : <LoginForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;