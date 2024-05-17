import { RootState } from "@/app/store";
import { useOwner } from "@/hooks/owner/useOwner";
import { useReservation } from "@/hooks/reservation/useReservation";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useSelector } from "react-redux";

const selectCampsiteInfo = createSelector(
  (state: RootState) => state.ownerSide.campsiteId,
  (state: RootState) => state.auth.isLogin,
  (campsiteId, isLogin) => ({ campsiteId, isLogin })
);

interface ICampsiteImage {
  imageId: number;
  url: string;
}

const OwnerManagePhoto = () => {
  const { campsiteId, isLogin } = useSelector(selectCampsiteInfo);
  const { useGetCampsite } = useReservation();
  const { data: detailCampsiteInfo } = useGetCampsite(campsiteId!, isLogin);
  const { useThumbnailMutation, useMapImageMutation, useUpdateGeneralImages } = useOwner();

  const { mutate: thumbnailMutate } = useThumbnailMutation(campsiteId!);
  const { mutate: mapImageMutate } = useMapImageMutation(campsiteId!);
  const { mutate: updateGeneralImages } = useUpdateGeneralImages();

  useEffect(() => {
    // detailCampsiteInfo가 변경될 때마다 대표 사진과 배치도 사진을 설정
    if (detailCampsiteInfo) {
      setMainPhoto(detailCampsiteInfo?.data.campsite.thumbnailImageUrl || "");
      setViewPhoto(detailCampsiteInfo?.data.campsite.mapImageUrl || "");
      setOtherPhoto(detailCampsiteInfo?.data.campsite.campsiteImageUrlList || []);
      console.log("일반 이미지 조회되는 형태 확인 :", detailCampsiteInfo?.data.campsite.campsiteImageUrlList )
    }
  }, [detailCampsiteInfo]);

  // 대표 사진
  const [mainPhoto, setMainPhoto] = useState<string>(
    detailCampsiteInfo?.data.campsite.thumbnailImageUrl || ""
  );
  const mainImgRef = useRef<HTMLInputElement>(null);
  const [mainImage, setMainImage] = useState<File>();

  // 배치도 사진
  const [viewPhoto, setViewPhoto] = useState<string>(
    detailCampsiteInfo?.data.campsite.mapImageUrl || ""
  );
  const viewImgRef = useRef<HTMLInputElement>(null);
  const [viewImage, setViewImage] = useState<File>();

  // 추가 사진
  const [otherPhotos, setOtherPhotos] = useState<File[]>([]);
  const [otherPhoto, setOtherPhoto] = useState<ICampsiteImage[]>(
    detailCampsiteInfo?.data.campsite.campsiteImageUrlList || []
  ); // 화면
  const otherImgRef = useRef<HTMLInputElement>(null);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const saveMainImgFile = () => {
    if (mainImgRef.current && mainImgRef.current.files) {
      const file: File | undefined = mainImgRef.current.files[0];
      setMainImage(file);
      if (file) {
        thumbnailMutate(file);
      }
    }
    console.log(typeof mainImage)
  };

  const saveViewImgFile = () => {
    if (viewImgRef.current && viewImgRef.current.files) {
      const file: File | undefined = viewImgRef.current.files[0];
      setViewImage(file);
      if (file) {
        mapImageMutate(file);
      }
    }
    console.log(typeof viewImage)
  };

  const saveOtherImgFiles = () => {
    if (otherImgRef.current && otherImgRef.current.files) {
      const newPhotos: File[] = [];
      const newPhotoURLs: ICampsiteImage[] = [];
  
      for (let i = 0; i < otherImgRef.current.files.length; i++) {
        const file: File = otherImgRef.current.files[i];
        newPhotos.push(file);
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            newPhotoURLs.push({ imageId: Date.now(), url: reader.result.toString() });
            if (i === otherImgRef.current!.files!.length - 1) {
              setOtherPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
              setOtherPhoto((prevURLs) => [...prevURLs, ...newPhotoURLs]);
            }
          }
        };
      }
    }
  }; 

  // 이미지 삭제
  const deletePhoto = (id: number) => {
    const imageId = otherPhoto[id]?.imageId;
    if (imageId !== undefined) {
      setDeletedImageIds((prev) => [...prev, imageId]);
    }
    setOtherPhoto(otherPhoto.filter((_, index) => index !== id));
  };

  const handleSaveImages = () => {
    const insertImageList = otherPhotos;

    updateGeneralImages(
      {
        campsiteId: campsiteId!,
        deleteImageList: { imageIdList: deletedImageIds },
        insertImageList,
      },
      {
        onSuccess: (res) => {
          console.log("캠핑장 일반 사진 업데이트 성공", res);
        },
        onError: (err) => {
          console.error("캠핑장 일반 사진 업데이트 실패", err);
        },
      }
    );
  };

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
              <p className="text-xs pt-4">
                클릭하여 캠핑장의 대표 사진을 등록 / 수정
              </p>
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
                클릭하여 캠핑장의 배치도 사진을 등록 / 수정
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
                      <img src={image.url} className="w-24 h-24 object-cover"></img>
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
          <div className="text-end">
            <button onClick={() => handleSaveImages()} className="text-sm">
              추가 사진 저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerManagePhoto;
