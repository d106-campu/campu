import Lottie from "react-lottie";
import { useState } from "react";
import { noImageOptions } from "@/assets/lotties/lottieOptions";
import defaultProfile from "@/assets/images/profile.png"; // 기본 프로필
import { formatReviewTime } from "@/utils/formatDateTime";

interface IReviewPhotosProps {
  images: string[];
  nickname: string;
  profile: string;
  date: string;
}

const ReviewPhotos = ({
  images,
  nickname,
  profile,
  date,
}: IReviewPhotosProps) => {
  const profileImage = profile || defaultProfile;
  const [selectedImage, setSelectedImage] = useState<string>(images[0]); // 선택된 이미지 상태 관리

  return (
    <div className="ml-12 text-lg w-[800px]">
      <div className="flex justify-between items-end pt-7">
        <div className="flex items-center gap-2 px-3">
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="rounded-full overflow-hidden w-7 h-7"
          />
          <p className="text-BLACK font-bold text-lg">{nickname}</p>
        </div>
        <div>
          <p className="text-[#A0A0A0] text-sm mr-3">
            {formatReviewTime(date)} 작성
          </p>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col justify-center h-64">
          <Lottie
            options={noImageOptions}
            height={200}
            width={300}
            speed={0.5}
          />
          <p className="text-UNIMPORTANT_TEXT_02 text-center">
            리뷰 사진이 없어요
          </p>
        </div>
      ) : (
        <div className="flex gap-4 px-3 pt-3 h-[450px]">
          {/* 메인 이미지 */}
          <img
            src={selectedImage}
            alt="리뷰 이미지"
            className="w-[700px] rounded-2xl object-cover object-center"
          />
          {/* 썸네일 이미지 리스트 */}
          <div className="flex flex-col gap-4 items-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className={`min-w-[80px] w-[80px] h-[80px] cursor-pointer object-cover object-center rounded-lg ${
                  selectedImage === image ? "" : "opacity-40"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewPhotos;
