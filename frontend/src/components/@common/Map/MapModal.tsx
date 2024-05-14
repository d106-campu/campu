import Modal from "../Modal/Modal";
import KakaoMap from "./KakaoMap";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { FiMapPin } from "react-icons/fi";
import { TbCopy } from "react-icons/tb";

interface IMapModalProps {
  lat: number;
  lng: number;
  facltNm: string;
  rate?: number;
  addr1?: string;
  level?: number;
  toggleModal: () => void;
}

const MapModal = ({
  lat,
  lng,
  facltNm,
  rate,
  addr1,
  level = 5,
  toggleModal,
}: IMapModalProps) => {
  // level: 지도 확대 정도 ( 기본 5로 임의 지정 )
  const locations = [{ lat, lng, facltNm, rate, level }];

  console.log(locations);

  return (
    <>
      <Modal
        width="w-[60%]"
        onClose={toggleModal}
        title={facltNm}
        titleStyle="text-BLACK text-2xl font-bold"
      >
        {addr1 && (
          <button
            onClick={() => copyToClipboard(addr1)}
            className="pb-[12px] cursor-pointer"
          >
            <h3 className="flex items-center gap-1 text-gray-400">
              <FiMapPin />
              캠핑장 위치
            </h3>
            <p className="flex items-center font-bold text-[#707070]">
              {addr1}
              <TbCopy size={15} className="m-1" />
            </p>
          </button>
        )}
        <div className="h-[400px]">
          <KakaoMap locations={locations} />
        </div>
      </Modal>
    </>
  );
};
export default MapModal;
