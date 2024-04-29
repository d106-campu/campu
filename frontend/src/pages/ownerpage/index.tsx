import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";

const OwnerPage = () => {
  return (
    <div>
      <Header page={"main"} />
      <OwnerContainer />
      <Footer />
    </div>
  );
};

export default OwnerPage;
