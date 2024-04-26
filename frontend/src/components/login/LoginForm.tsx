import { useState } from 'react';

interface LoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
}

const LoginForm = ({ isSmallScreen, toggleForm }: LoginFormProps): JSX.Element => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [errors, setErrors] = useState({ id: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = false;
    let newErrors = { id: '', password: '' };

    if (!credentials.id) {
      newErrors.id = '아이디를 입력해주세요.';
      isValid = true;
    }

    if (!credentials.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = true;
    }

    if (!isValid) {
      // 여기서 api 통신 연결 -> 아이디, 비번 틀렸을 때의 유효성 처리 필요
      console.log('백엔드측으로 로그인 요청함');
    }

    setErrors(newErrors);
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-[75vh] flex items-center justify-center rounded-lg shadow-2xl bg-white relative">
          <div className="w-[80%]">
            {/* 헤더 */}
            <p
              className={isSmallScreen ? "cursor-pointer visible text-centerfont-bold text-xs absolute top-3 left-10" : "invisible"}
              onClick={toggleForm}
            >
              &lt; 회원가입
            </p>
            <div className="w-full p-3 flex items-center justify-center">
              <p className="text-center font-bold text-xl">
                로그인
              </p>
            </div>
            {/* 입력 폼 */}
            <form onSubmit={handleSubmit}>
              <div className='flex justify-between'>
                <h1 className="text-sm py-2 pl-1">아이디</h1>
                {errors.id && <p className="text-xs pl-1 pt-3 text-red-400">{errors.id}</p>}
              </div>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="아이디를 입력하세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 rounded-lg outline-none text-sm"
                value={credentials.id}
                onChange={handleInputChange}
              />
              <div className='flex justify-between'>
                <h1 className="text-sm py-2 pl-1">비밀번호</h1>
                {errors.password && <p className="text-xs pl-1 pt-3 text-red-400">{errors.password}</p>}
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 rounded-lg outline-none text-sm"
              />
              <div className="flex flex-col justify-center items-center py-5 ">
                <button type="button" className="text-gray-400 hover:text-black py-5 outline-none">
                  비밀번호를 잊으셨나요?
                </button>
                <input
                  type="submit"
                  value="로그인"
                  className="w-full bg-green-700 text-white rounded-md px-auto py-2 hover:bg-green-800 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;