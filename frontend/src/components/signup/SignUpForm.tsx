const SignUpForm = () => {

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-[100%] h-[70vh] flex items-center justify-center rounded-2xl shadow-2xl bg-white">
          <div className="w-[80%]">
            <div className="py-3">
              <p className="text-center font-bold text-xl">
                회원가입
              </p>
            </div>
            <form className="">
              <h1 className="text-sm py-2 pl-1">아이디</h1>
              <input
                type="id"
                placeholder="아이디는 6~16자 이내로 해주세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">닉네임</h1>
              <input
                type="nickName"
                placeholder="닉네임은 6자 이내로 해주세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">비밀번호</h1>
              <input
                type="id"
                placeholder="비밀번호는 영문자, 숫자, 특수문자를 포함한 8자 이상입니다."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">비밀번호 확인</h1>
              <input
                type="id"
                placeholder="비밀번호를 한번 더 입력해주세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <h1 className="text-sm py-2 pl-1">휴대폰 번호</h1>
              <input
                type="id"
                placeholder="본인의 전화번호를 입력해주세요."
                className="w-full h-10 pl-2 border-2 border-gray-100 focus:border-green-700 rounded-lg outline-none text-sm"
              />
              <div className="flex flex-col justify-center items-center py-5">
                <input
                  type="submit"
                  value="회원가입"
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

export default SignUpForm;