import Footer from "@/components/@common/Footer/Footer";
import PhotosContainer from "@/components/reservation/photos/PhotosContainer";
import PhotosHeader from "@/components/reservation/photos/PhotosHeader";
import { useLocation } from "react-router-dom";

const PhotosPage = () => {
  const location = useLocation();
  const { main, photos, id, like } = location.state || {}; // state가 없을 경우를 대비해 기본값 설정
  return (
    <>
      <PhotosHeader campsiteId={id} liked={like} />
      <PhotosContainer main={main} photos={photos} />
      <Footer />
    </>
  );
};
export default PhotosPage;