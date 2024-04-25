import logo from "@/assets/images/temp_log2.png";
import profileImage from "@/assets/images/profile.png";
import { useLocation } from "react-router-dom";
import HeaderLink from "@/components/@common/HeaderLink/HeaderLink";
import AlertLink from "@/components/Alert/AlertLink ";

// @TODO: 로그인 여부 구분
// @TODO: 알림 열기
const Header = ({ page }: { page?: string }) => {
  const location = useLocation();

  const isCurrentPage = (location: string, target: string) => {
    if (location.includes(target)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`relative flex justify-between items-center w-full h-14 p-5 px-10 ${
        page === "main" ? " bg-white/80 fixed top-0 left-0 z-10" : ""
      }`}
    >
      <img src={logo} alt="logo" className="w-24 cursor-pointer" />
      <div className="grid grid-cols-5 flex-grow max-w-2xl">
        <HeaderLink
          label="홈"
          link="/"
          isClicked={isCurrentPage(location.pathname, "main")}
        />
        <HeaderLink
          label="캠핑장 찾기"
          link="/search"
          isClicked={isCurrentPage(location.pathname, "search")}
        />
        <HeaderLink
          label="마이페이지"
          link="/my"
          isClicked={isCurrentPage(location.pathname, "my")}
        />
        <HeaderLink
          label="캠핑장 관리"
          link="/owner"
          isClicked={isCurrentPage(location.pathname, "owner")}
        />

        {/* 알림 */}
        {/* @TODO: SSE 알림 여부 구분*/}
        <AlertLink hasAlert={true} />
      </div>
      <div className="p-1 pl-2 flex items-center cursor-pointer">
        <span className=" text-sm p-2 mr-2 cusor-pointer rounded-md hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN">
          로그아웃
        </span>
        <img
          src={profileImage}
          alt="default profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
