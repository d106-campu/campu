import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import BackButton from "@/components/reservation/reviewList/review/BackButton";

interface IHeaderProps {
  campsiteId: number;
  liked: boolean;
}

const PhotosHeader = ({ campsiteId, liked }: IHeaderProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked); // 좋아요 상태관리

  return (
    <header className="fixed flex justify-between items-center w-full h-14 p-5 px-10 bg-white/80 top-0 left-0 z-10">
      {/* 뒤로가기 */}
      <BackButton route={`/camps/${campsiteId}`} />

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
export default PhotosHeader;
