import { errorOptions } from "@/assets/lotties/lottieOptions";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Lottie options={errorOptions} width={460} height={400} />
      <p className="pb-4">잘못된 경로입니다 😅</p>
      <div>
        <button
          onClick={() => navigate("/")}
          className="border border-blue-400 px-4 py-2 rounded-lg text-sm text-blue-500"
        >
          메인으로
        </button>
      </div>
    </div>
  );
};
export default ErrorPage;
