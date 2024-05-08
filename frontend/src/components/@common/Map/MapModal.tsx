import { useState } from "react";
import Modal from "../Modal/Modal";
import KakaoMap from "./KakaoMap";

// interface IMapModalProps {
//   lat: number;
//   lng: number;
// }

const MapModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const locations = [{ lat: 36.1071305028147, lng: 128.4169500162442 }];

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
