interface IPhotoContainerProps {
  main: string;
  photos: string[];
}

const PhotosContainer = ({ main, photos }: IPhotoContainerProps) => {
  return (
    <main className="max-w-[50%] mx-auto flex flex-col gap-6 py-20">
      {/* 캠핑장 대표 사진 */}
      <img
        src={main}
        alt="캠핑장 대표 사진"
        className="object-contain object-center w-full rounded-lg"
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
  );
};
export default PhotosContainer;
