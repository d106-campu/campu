import Lottie from "react-lottie";
import { roomsLoadingOptions } from "@/assets/lotties/lottieOptions";

const Loading = () => {
  return (
    <div className="pt-10 text-center mx-auto">
      <p className="text-MAIN_GREEN text-lg font-semibold">로딩 중</p>
      <p className="text-sm text-SUB_BLACK">잠시만 기다려 주세요</p>
      <Lottie options={roomsLoadingOptions} height={90} width={200} />
    </div>
  );
};
export default Loading;
