import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import CampingPhotos from "@/components/reservation/CampingPhotos";
// 더미 이미지
import mainPhoto from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";

const ReservationPage = () => {
  const main = mainPhoto;
  const photos = [photo1, photo2, photo3, photo4, photo5];
  // const photos = [photo1, photo2, photo3, photo4];
  // const photos = [photo1, photo2, photo3];
  // const photos = [photo1, photo2];
  // const photos = [photo1];
  // const photos = [];

  return (
    <>
      <Header />
      <div className="max-w-[80%] mx-auto">
        <div className="py-5">
          <CampingPhotos main={main} photos={photos} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
