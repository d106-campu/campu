import Aircon from "@/assets/images/reservation/aircon.png";
import Bed from "@/assets/images/reservation/bed.png";
import Cooker from "@/assets/images/reservation/cooker.png";
import Heater from "@/assets/images/reservation/heater.png";
import Refrigerator from "@/assets/images/reservation/refrigerator.png";
import Shower from "@/assets/images/reservation/shower.png";
import Toilet from "@/assets/images/reservation/toilet.png";
import Tv from "@/assets/images/reservation/tv.png";
import Wifi from "@/assets/images/reservation/wifi.png";
import Pet from "@/assets/images/reservation/pet.png";

interface IFacilityListProps {
  facilities: string[];
  pet?: boolean;
}

const FacilityList = ({ facilities, pet }: IFacilityListProps) => {
  const facilityImages: { [key: string]: string } = {
    에어컨: Aircon,
    침대: Bed,
    바베큐장: Cooker,
    난방기구: Heater,
    냉장고: Refrigerator,
    샤워실: Shower,
    화장실: Toilet,
    TV: Tv,
    와이파이: Wifi,
  };

  const facilityNames: { [key: string]: string } = {
    내부샤워실: "샤워실",
    내부화장실: "화장실",
    유무선인터넷: "와이파이",
    취사도구: "바베큐장",
  };

  return (
    <div className="flex justify-start items-end gap-2">
      {facilities.map((facility) => {
        const displayName = facilityNames[facility] || facility;
        const imageSrc = facilityImages[displayName];
        return (
          <div key={facility} className="p-3 flex flex-col items-center">
            <img src={imageSrc} alt={displayName} className="mb-2" />
            <p className="text-center">{displayName}</p>
          </div>
        );
      })}
      {pet && (
        <div className="p-3 flex flex-col items-center">
          <img src={Pet} alt="반려동물 허용" className="mb-2" />
          <p className="text-center">반려동물</p>
        </div>
      )}
    </div>
  );
};

export default FacilityList;
