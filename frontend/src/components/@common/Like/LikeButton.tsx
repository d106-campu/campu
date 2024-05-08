import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addLike, removeLike } from "@/features/like/campsiteLikeSlice";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

interface ILikeButtonProps {
  campsiteId: number;
  className?: string;
  iconSize?: number;
}

const LikeButton = ({
  campsiteId,
  className,
  iconSize = 38,
}: ILikeButtonProps) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const isLiked = useSelector(
    (state: RootState) => state.campsiteLike.likes[campsiteId] !== undefined
  );
  const dispatch = useDispatch();

  const handleToggleLike = () => {
    if (isLogin) {
      if (isLiked) {
        dispatch(removeLike(campsiteId));
      } else {
        dispatch(addLike(campsiteId));
      }
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
