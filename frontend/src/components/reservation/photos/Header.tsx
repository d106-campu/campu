import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

interface IHeaderProps {
  campsiteId: number;
  liked: boolean;
}

const Header = ({ campsiteId, liked }: IHeaderProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(liked); // 좋아요 상태관리

  return (
    <header className="fixed flex justify-between items-center w-full h-14 p-5 px-10 bg-white/80 top-0 left-0 z-10">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(`/reservation/${campsiteId}`)}
        className="p-3 rounded-full hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
      >
        <SlArrowLeft />
      </button>

      {/* 좋아요 */}
      <button onClick={() => setIsLiked(!isLiked)} className="p-3">
        {isLiked ? (
          <VscHeartFilled size={25} color="#FF777E" />
        ) : (
          <VscHeart size={25} color="#e9e9e9" />
        )}
      </button>
    </header>
  );
};
export default Header;
