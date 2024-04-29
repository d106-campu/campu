import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";
import SideTabbar from "@/components/owner/SideTabbar";

const OwnerPage = () => {

  const campgrounds = ["캠핑장1", "캠핑장2", "캠핑장3"];


  return (
    <div>
      <Header page={"main"} />
      <SideTabbar campgrounds={campgrounds} />
      <OwnerContainer />
      <Footer />
    </div>
  );
};

export default OwnerPage;