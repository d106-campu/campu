import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import AddCamping from "@/components/owner/AddCamping";

const OwnerAddPage = () => {
  return (
    <>
      <Header page={"owner"} />
      <AddCamping />
      <Footer />
    </>
  );
};

export default OwnerAddPage;
