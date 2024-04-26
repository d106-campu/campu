import { useNavigate } from "react-router-dom";
import Button from "../@common/Button/Button";
import { PiImage } from "react-icons/pi";

interface ICampingPhotosProps {
  main: string;
  photos: string[];
}

const CampingPhotos = ({ main, photos }: ICampingPhotosProps) => {
  const navigate = useNavigate();

  const displayedPhotos = photos.slice(0, 4); // 최대 4개의 사진만 가져옴
  const photoNum = displayedPhotos.length;

  const gridHeight = "h-80";
  const mainPhotoGrid = photoNum === 0 ? "col-span-9" : "col-span-5";

  // 추가 사진들의 그리드 클래스 계산
  const photoGrid = (index: number) => {
    switch (photoNum) {
      case 1:
        return "col-span-4 row-span-4";
      case 2:
        return "col-span-4";
      case 3:
        return `${index === 0 ? "col-span-4" : "col-span-2"}`;
      default:
        return "col-span-2";
    }
  };

  return (
    <div className="pt-5 relative">
      <div
        className={`grid grid-rows-2 grid-cols-9 gap-4 rounded-lg overflow-hidden ${gridHeight}`}
      >
        {/* 캠핑장 대표 사진 */}
        <img
          src={main}
          alt="캠핑장 대표 사진"
          className={`${mainPhotoGrid} row-span-2 object-cover object-center w-full ${gridHeight}`}
        />

        {/* 추가 사진들 */}
        {displayedPhotos &&
          displayedPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`캠핑장 추가 사진 ${index}`}
              className={`${photoGrid(
                index
              )} row-span-1 object-cover object-center w-full h-full`}
            />
          ))}
      </div>
      <div className="absolute bottom-2 right-2">
        <Button
          text="사진 모두 보기"
          icon={PiImage}
          backgroundColor="bg-[#030303cc]"
          hoverBackgroundColor="hover:bg-[#030303]"
          onClick={() => navigate("/reservation-photos")}
        />
      </div>
    </div>
  );
};

export default CampingPhotos;
