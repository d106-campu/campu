import { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const OwnerManage = () => {
  // 대표 사진
  const [mainPhoto, setMainPhoto] = useState<string>("");
  const mainImgRef = useRef<HTMLInputElement>(null);
  const [mainImage, setMainImage] = useState<File>();

  // 배치도 사진
  const [viewPhoto, setViewPhoto] = useState<string>("");
  const viewImgRef = useRef<HTMLInputElement>(null);
  const [viewImage, setViewImage] = useState<File>();

  // 추가 사진
  const [otherPhotos, setOtherPhotos] = useState<File[]>([]);
  const [otherPhoto, setOtherPhoto] = useState<string[]>([]);
  const otherImgRef = useRef<HTMLInputElement>(null);

  const saveMainImgFile = () => {
    if (mainImgRef.current && mainImgRef.current.files) {
      const file: File | undefined = mainImgRef.current.files[0];
      setMainImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          setMainPhoto(result);
        };
      }
    }
  };

  const saveViewImgFile = () => {
    if (viewImgRef.current && viewImgRef.current.files) {
      const file: File | undefined = viewImgRef.current.files[0];
      setViewImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          setViewPhoto(result);
        };
      }
    }
  };

  const saveOtherImgFiles = () => {
    if (otherImgRef.current && otherImgRef.current.files) {
      const newPhotos: string[] = [];

      for (let i = 0; i < otherImgRef.current.files.length; i++) {
        const file: File = otherImgRef.current.files[i];

        setOtherPhotos((prevPhotos) => [...prevPhotos, file]);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          newPhotos.push(result);

          if (otherImgRef.current && otherImgRef.current.files) {
            if (i === otherImgRef.current.files.length - 1) {
              // 마지막 파일이 로드되면 한 번에 업데이트
              setOtherPhoto((prevPhotos) => [...prevPhotos, ...newPhotos]);
            }
          }
        };
      }
    }
  };

  // 이미지 삭제
  const deletePhoto = (id: number) => {
    setOtherPhoto(otherPhoto.filter((_, index) => index !== id));
  };

  console.log(mainImage, viewImage, otherPhotos);

  return (
    <>
      <div className="py-5">
        <div className="p-4 font-semibold">캠핑장 사진 등록</div>

        {/* 대표사진 및 배치도 사진 등록 */}
        <div className="w-full">
          <div className="flex justify-evenly pb-4">
            {/* 대표 사진 */}
            <div className="w-[45%] text-center">
              <label
                className="flex border border-gray-300 items-center justify-center h-44 rounded-lg"
                htmlFor="mainPhoto"
              >
                {mainPhoto ? (
                  <img
                    src={mainPhoto}
                    alt="profilePhoto"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <CiCamera
                    className="flex justify-center"
                    size="2rem"
                    color="#878787"
                  />
                )}
                <input
                  name="photo"
                  onChange={saveMainImgFile}
                  ref={mainImgRef}
                  multiple
                  type="file"
                  accept="image/*"
                  id="mainPhoto"
                  className="hidden w-full h-full cursor-pointer"
                ></input>
              </label>
              <p className="text-xs pt-4">캠핑장의 대표 사진을 등록해주세요.</p>
            </div>

            {/* 배치도 사진 */}
            <div className="w-[45%] text-center">
              <label
                className="flex border border-gray-300 items-center justify-center h-44 rounded-lg"
                htmlFor="viewPhoto"
              >
                {viewPhoto ? (
                  <img
                    src={viewPhoto}
                    alt="profilePhoto"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <CiCamera
                    className="flex justify-center"
                    size="2rem"
                    color="#878787"
                  />
                )}
                <input
                  name="viewPhoto"
                  onChange={saveViewImgFile}
                  ref={viewImgRef}
                  multiple
                  type="file"
                  accept="image/*"
                  id="viewPhoto"
                  className="hidden w-full h-full cursor-pointer"
                ></input>
              </label>
              <p className="text-xs pt-4">
                캠핑장의 배치도 사진을 등록해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 캠핑장 추가 사진들 */}
        <div className="w-full h-full pt-5">
          <p className="p-4 text-sm">추가 사진 등록</p>
          <ul className="flex px-6">
            <li className="pr-4">
              <label
                className="flex border border-gray-300 items-center justify-center w-24 h-24 rounded-lg"
                htmlFor="photos"
              >
                <input
                  name="photos"
                  onChange={saveOtherImgFiles}
                  ref={otherImgRef}
                  multiple
                  type="file"
                  accept="image/*"
                  id="photos"
                  className="hidden w-full h-full cursor-pointer"
                ></input>
                <GoPlus size="1.5rem" color="#878787" />
              </label>
            </li>
            <div className="overflow-x-auto whitespace-nowrap flex gap-3">
              {otherPhoto.length !== 0 &&
                otherPhoto.map((image, index) => (
                  <li key={index}>
                    <div className="w-24 h-24 overflow-hidden rounded-lg relative border">
                      <img src={image} className="w-24 h-24 object-cover"></img>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          deletePhoto(index);
                        }}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white flex justify-center items-center"
                      >
                        <FaMinus size={"0.5rem"} />
                      </div>
                    </div>
                  </li>
                ))}
            </div>
          </ul>
        </div>

        {/* post 버튼 */}
        <div className="flex justify-end p-4 text-sm">
          <button className="bg-gray-300 px-4 py-2 rounded-md">저징하기</button>
        </div>
      </div>
    </>
  );
};

export default OwnerManage;
