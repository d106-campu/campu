import { MAX_REVIEW_PHOTOS } from "@/constants/constants";
import { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

interface IUploadPhotosProps {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadPhotos = ({ photos, setPhotos }: IUploadPhotosProps) => {
  const maxPhotos = 5; // 최대 사진 수
  const [message, setMessage] = useState(""); // 사용자에게 보여줄 메시지
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0); // 선택된 사진의 인덱스

  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFiles = () => {
    if (imgRef.current && imgRef.current.files) {
      if (photos.length >= maxPhotos) {
        setMessage(
          `리뷰 사진은 최대 ${MAX_REVIEW_PHOTOS}장 첨부할 수 있습니다.`
        );
        return;
      }
      setMessage(""); // 메시지 초기화
      const newPhotos: string[] = [];
      const filesToLoad = Math.min(
        imgRef.current.files.length,
        maxPhotos - photos.length
      ); // 남은 사진 수만큼만 업로드 허용

      for (let i = 0; i < imgRef.current.files.length; i++) {
        const file = imgRef.current.files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const result = reader.result as string;
          newPhotos.push(result);

          // 마지막 파일이 로드되면 한 번에 업데이트
          if (i === filesToLoad - 1) {
            setPhotos((prevPhotos: string[]) => [...prevPhotos, ...newPhotos]);
          }
        };
      }
    }
  };

  // 이미지 삭제
  const deletePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, idx) => idx !== index));
    if (index === selectedPhotoIndex) {
      setSelectedPhotoIndex(0); // 삭제된 사진이 선택된 사진이었다면, 인덱스를 초기화
    } else if (index < selectedPhotoIndex) {
      setSelectedPhotoIndex((prevIndex) => prevIndex - 1); // 삭제된 사진이 선택된 사진보다 앞에 있었다면 인덱스 조정
    }
  };

  const handlePhotoSelect = (index: number) => {
    setSelectedPhotoIndex(index); // 선택된 사진의 인덱스를 업데이트
  };

  return (
    <>
      <div className="ml-16 w-[900px]">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold py-3">캠핑장 사진</h3>
          <p className="text-[#a7a7a7] text-sm mr-36">
            {message && (
              <span className="text-MAIN_RED text-sm mr-3">{message}</span>
            )}
            {photos.length} / {MAX_REVIEW_PHOTOS}장
          </p>
        </div>
        <div className="w-full">
          {/* 대표 사진 */}
          <div className="text-center w-[85%]">
            <label
              className="flex border border-gray-300 items-center justify-center h-80 rounded-lg"
              htmlFor="mainPhoto"
            >
              {photos.length !== 0 ? (
                <img
                  src={photos[selectedPhotoIndex]}
                  alt="profilePhoto"
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <CiCamera
                      className="flex justify-center"
                      size="50"
                      color="#a7a7a7"
                    />
                    <p className="text-sm pt-2 text-[#a7a7a7]">
                      캠핑장의 대표 사진을 등록해주세요.
                    </p>
                  </div>
                  <input
                    name="photo"
                    onChange={saveImgFiles}
                    ref={imgRef}
                    multiple
                    type="file"
                    accept="image/*"
                    id="mainPhoto"
                    className="hidden w-full h-full cursor-pointer"
                  />
                </>
              )}
            </label>
          </div>

          {/* 캠핑장 추가 사진들 */}
          {photos.length !== 0 && (
            <div className="w-full h-full py-4">
              <ul className="flex gap-4">
                <li>
                  <label
                    className="flex border border-gray-300 items-center justify-center w-20 h-20 rounded-lg"
                    htmlFor="photos"
                  >
                    <input
                      name="photos"
                      onChange={saveImgFiles}
                      ref={imgRef}
                      multiple
                      type="file"
                      accept="image/*"
                      id="photos"
                      className="hidden w-full h-full cursor-pointer"
                    />
                    <GoPlus size="1.5rem" color="#a7a7a7" />
                  </label>
                </li>
                <div className="overflow-x-auto whitespace-nowrap flex gap-3">
                  {photos.length !== 0 &&
                    photos.map((image, index) => (
                      <li key={index}>
                        <div className="w-20 h-20  overflow-hidden rounded-lg relative border">
                          <img
                            src={image}
                            className="w-20 h-20 object-cover"
                            onClick={() => handlePhotoSelect(index)}
                          />
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              deletePhoto(index);
                            }}
                            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-MAIN_RED text-white flex justify-center items-center"
                          >
                            <FaMinus size="10" />
                          </div>
                        </div>
                      </li>
                    ))}
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UploadPhotos;
