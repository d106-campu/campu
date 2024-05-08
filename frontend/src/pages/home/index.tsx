import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import MapModal from "@/components/@common/Map/MapModal";
import HomeContainer from "@/components/home/HomeContainer";
import { useState } from "react";

const HomePage = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  //임시
  // const latitude = 37.5665;
  // const longitude = 126.978;

  return (
    <div>
      <Header page={"main"} />
      <HomeContainer />
      <Footer />

      {isMapModalOpen && <MapModal />}
      {/* 모달을 열기 위한 버튼 또는 다른 UI를 추가합니다 */}
      <button onClick={openMapModal}>지도 열기</button>
    </div>
  );
};
export default HomePage;
