import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleLikeRequest } from "@/features/like/campsiteLikeSlice";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Toast from "@/components/@common/Toast/Toast";

interface ILikeButtonProps {
  like: boolean; // 초기 좋아요 상태
  campsiteId: number;
  className?: string;
  iconSize?: number;
}

const LikeButton = ({
  like,
  campsiteId,
  className,
  iconSize = 38,
}: ILikeButtonProps) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [isLiked, setIsLiked] = useState(like); // 초기 상태를 prop에서 받음
  const dispatch = useDispatch();

  // 로그인 상태가 변경되었을 때 좋아요 상태를 리셋할 수도 있음
  useEffect(() => {
    setIsLiked(like);
  }, [like]);

  const handleToggleLike = () => {
    if (isLogin) {
      dispatch(toggleLikeRequest(campsiteId)); // 좋아요 버튼 클릭 시 액션 디스패치
      setIsLiked(!isLiked); // 로컬 상태 토글
    } else {
      Toast.error("좋아요를 누르려면 로그인이 필요합니다.");
    }
    return;
  };

  return (
    <button onClick={handleToggleLike} className={className}>
      {isLiked ? (
        <VscHeartFilled size={iconSize} color="#FF777E" />
      ) : (
        <VscHeart size={iconSize} color="#e9e9e9" />
      )}
    </button>
  );
};

export default LikeButton;
