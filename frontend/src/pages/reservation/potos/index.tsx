import Footer from "@/components/@common/Footer/Footer";
import PhotoContainer from "@/components/reservation/photos/PhotoContainer";

const PhotosPage = () => {
  return (
    <>
      <Header campsiteId={campsiteId} liked={liked} />
      <PhotoContainer main={main} photos={photos} />
      <Footer />
    </>
  );
};
export default PhotosPage;

// 더미 데이터 (스토어에서 가져오기)
const main = mainPhoto;
const photos: string[] = [photo1, photo2, photo3, photo4, photo5];
const campsiteId = 1;
const liked = true;

// 더미 이미지
import mainPhoto from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";
import Header from "@/components/reservation/photos/Header";
