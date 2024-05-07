import { FaGithub, FaWindows } from "react-icons/fa";

const Footer = ({ state }: { state?: string }) => {
  return (
    <div
      className={`w-full p-6 h-auto grid text-xs bg-gray-200 text-gray-400 ${
        state === "onePage" ? "fixed bottom-0" : ""
      }`}
    >
      <div className="flex items-center justify-around">
        <div className="flex items-center">
          <div className="text-xl px-20 font-semibold">CampU</div>

          <div className="border-l border-gray-400 px-20">
            © SSAFY 10기
            <br />
            자율 프로젝트 Team_HO
            <br />
            경상북도 구미시 3공단3로 302
          </div>
        </div>
        <div className="px-10">
          <div className="flex items-center">
            <FaWindows />
            <span className="px-2">https://www.ssafy.com</span>
          </div>
          <div className="flex items-center">
            <FaGithub />
            <span className="px-2"> https://github.com/d106-campu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
