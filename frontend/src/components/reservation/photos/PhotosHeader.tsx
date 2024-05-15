import BackButton from "@/components/reservation/reviewList/review/BackButton";
import LikeButton from "@/components/@common/Like/LikeButton";

interface IHeaderProps {
  campsiteId: number;
  like: boolean;
}

const PhotosHeader = ({ campsiteId, like }: IHeaderProps) => {
  return (
    <header className="fixed flex justify-between items-center w-full h-14 p-5 px-10 bg-white/80 top-0 left-0 z-10">
      {/* 뒤로가기 */}
      <BackButton route={`/camps/${campsiteId}`} />
      {/* 좋아요 */}
      <LikeButton like={like} campsiteId={campsiteId} iconSize={25} />
    </header>
  );
};
export default PhotosHeader;
