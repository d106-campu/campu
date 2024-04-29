import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import CampsiteIntro from "@/components/reservation/CampSiteIntro";
import Reservation from "@/components/reservation/Reservation";
import InfoDetail from "@/components/reservation/InfoDetail";

const ReservationPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-[70%] mx-auto py-2">
        <CampsiteIntro />
        <Reservation />
        <InfoDetail />
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
