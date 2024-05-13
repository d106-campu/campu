// 시설 아이콘
import Aircon from "@/assets/images/owner/aircon.png";
import Bed from "@/assets/images/owner/bed.png";
import Cooker from "@/assets/images/owner/cooker.png";
import Heater from "@/assets/images/owner/heater.png";
import Refrigerator from "@/assets/images/owner/refrigerator.png";
import Shower from "@/assets/images/owner/shower.png";
import Toilet from "@/assets/images/owner/toilet.png";
import Tv from "@/assets/images/owner/tv.png";
import Wifi from "@/assets/images/owner/wifi.png";
import BedSelect from "@/assets/images/owner/bed_select.png";
import CookerSelect from "@/assets/images/owner/cooker_select.png";
import HeaterSelect from "@/assets/images/owner/heater_select.png";
import RefrigeratorSelect from "@/assets/images/owner/refrigerator_select.png";
import ShowerSelect from "@/assets/images/owner/shower_select.png";
import ToiletSelect from "@/assets/images/owner/toilet_select.png";
import TvSelect from "@/assets/images/owner/tv_select.png";
import AirconSelect from "@/assets/images/owner/aircon_select.png";
import WifiSelect from "@/assets/images/owner/wifi_select.png";

interface FacilityListProps {
  selectedFacility: string[];
  onFacilityToggle: (facility: string) => void;
}

const FacilityList = ({
  selectedFacility,
  onFacilityToggle,
}: FacilityListProps) => {
  const getSelectedImage = (item: string) => {
    const isSelected = selectedFacility.includes(item);
    switch (item) {
      case "화장실":
        return isSelected ? ToiletSelect : Toilet;
      case "샤워실":
        return isSelected ? ShowerSelect : Shower;
      case "냉장고":
        return isSelected ? RefrigeratorSelect : Refrigerator;
      case "에어컨":
        return isSelected ? AirconSelect : Aircon;
      case "난방기구":
        return isSelected ? HeaterSelect : Heater;
      case "TV":
        return isSelected ? TvSelect : Tv;
      case "와이파이":
        return isSelected ? WifiSelect : Wifi;
      case "취사도구":
        return isSelected ? CookerSelect : Cooker;
      case "침대":
        return isSelected ? BedSelect : Bed;
      default:
        throw new Error("Invalid item");
    }
  };
  return (
    <>
      <div className="flex justify-evenly items-end w-full">
        {[
          "화장실",
          "샤워실",
          "냉장고",
          "에어컨",
          "난방기구",
          "TV",
          "와이파이",
          "취사도구",
          "침대",
        ].map((item) => (
          <div
            key={item}
            className="cursor-pointer p-3 flex flex-col items-center"
            onClick={() => onFacilityToggle(item)}
          >
            <img src={getSelectedImage(item)} className="mb-2" />
            <p
              className={`text-center ${
                selectedFacility.includes(item)
                  ? "text-MAIN_GREEN"
                  : "text-[#A0A0A0]"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FacilityList;
