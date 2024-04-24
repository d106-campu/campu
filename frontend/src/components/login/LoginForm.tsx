const LoginForm = () => {

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-[100%] h-[70vh] flex items-center justify-center rounded-2xl shadow-2xl bg-white relative">
          <div className="w-[80%]">
            <div className="w-full p-3">
              <p className="text-center font-bold text-xl">
                로그인
              </p>
            </div>
            <form className="">
              <h1 className="text-sm py-2 pl-1">아이디</h1>
              <input
                type="id"
                placeholder="아이디를 입력하세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">비밀번호</h1>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 hover:border-green-700 rounded-lg outline-none text-sm"
              />
              <div className="flex flex-col justify-center items-center py-5">
                <button type="button" className="text-gray-400 hover:text-black py-5">
                  비밀번호를 잊으셨나요?
                </button>
                <input
                  type="submit"
                  value="로그인"
                  className="w-full bg-green-700 text-white rounded-lg px-auto py-2 hover:bg-green-800 cursor-pointer"
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