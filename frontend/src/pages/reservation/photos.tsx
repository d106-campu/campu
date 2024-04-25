import Footer from "@/components/@common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

const PhotosPage = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <>
      <div
        className={`relative flex justify-between items-center w-full h-14 p-5 px-10 bg-white/80 top-0 left-0 z-10" `}
      >
        <button
          onClick={() => navigate("/reservation")}
          className="p-3 rounded-full hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
        >
          <SlArrowLeft />
        </button>
        <button onClick={() => setIsLiked(!isLiked)} className="px-3">
          {isLiked ? (
            <VscHeartFilled size={25} color="#FF777E" />
          ) : (
            <VscHeart size={25} color="#e9e9e9" />
          )}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PhotosPage;
