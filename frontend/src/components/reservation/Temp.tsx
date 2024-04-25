interface ICampingPhotosProps {
  main: string;
  photos: string[];
}

const Temp = ({ main, photos }: ICampingPhotosProps) => {
  const photoNum = photos.length;
  const gridTemplateColumns = photoNum === 1 ? "1fr" : "1fr 1fr";
  const gridTemplateRows = photoNum > 2 ? "grid-rows-2" : "grid-rows-1";

  return (
    <div className="container mx-auto p-4 border-red-600 border-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-red-600 border-2">
        <div className="md:col-span-2 ">
          <img
            alt="Main Photo"
            className="object-cover object-center w-full rounded-lg"
            src={main}
          />
        </div>
        <div
          className={`grid gap-4 ${gridTemplateColumns} ${gridTemplateRows} md:col-span-1 border-red-600 border-2`}
        >
          {photos.map((photo, index) => (
            <img
              key={index}
              alt={`Camping site photo ${index}`}
              className="object-cover object-center w-full h-full rounded-lg"
              src={photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Temp;
