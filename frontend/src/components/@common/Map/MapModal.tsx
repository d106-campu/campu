import { useState } from "react";
import Modal from "../Modal/Modal";
import KakaoMap from "./KakaoMap";

interface IMapModalProps {
  lat: number;
  lng: number;
}

const MapModal = ({ lat, lng }: IMapModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // level: 지도 확대 정도 ( 기본 5로 임의 지정 )
  const locations = [{ lat: lat, lng: lng, level: 5 }];

  return (
    <>
      <Modal width="w-[60%]" onClose={toggleModal}>
        <div className="h-[400px]">
          <KakaoMap locations={locations} />
        </div>
      </Modal>
    </>
  );
};
export default MapModal;
