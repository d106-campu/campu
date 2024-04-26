import Footer from "@/components/@common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

// 더미 이미지
import mainPhoto from "@/assets/images/dummy/camping_spot_6.png";
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";
import photo4 from "@/assets/images/dummy/camping_spot_5.jpg";
import photo5 from "@/assets/images/dummy/camping_spot_1.png";

const PhotosPage = () => {
  const main = mainPhoto;
  const photos: string[] = [photo1, photo2, photo3, photo4, photo5];

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <>
      <header className="fixed flex justify-between items-center w-full h-14 p-5 px-10 bg-white/80 top-0 left-0 z-10">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate("/reservation")}
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
      <main className="max-w-[50%] mx-auto flex flex-col gap-6 py-20">
        {/* 캠핑장 대표 사진 */}
        <img
          src={main}
          alt="캠핑장 대표 사진"
          className="object-cover object-center w-full h-full rounded-lg"
        />

        {/* 추가 사진들 */}
        {photos &&
          photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`캠핑장 추가 사진 ${index}`}
              className="object-cover object-center w-full h-full rounded-lg"
            />
          ))}
      </main>
      <Footer />
    </>
  );
};

export default PhotosPage;
