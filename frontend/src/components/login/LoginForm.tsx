interface LoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
}

const LoginForm = ({ isSmallScreen, toggleForm }: LoginFormProps): JSX.Element => {

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
            <form className="">
              <h1 className="text-sm py-2 pl-1">아이디</h1>
              <input
                type="id"
                placeholder="아이디를 입력하세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">비밀번호</h1>
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