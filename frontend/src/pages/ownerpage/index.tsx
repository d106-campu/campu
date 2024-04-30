import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";
import SideTabbar from "@/components/owner/SideTabbar";
import AddCamping from "@/components/owner/AddCamping";

// @TODO: 임의 타입
type ICampgroundType = {
  campgrounds: string[] | null;
};

const OwnerPage = () => {
  const campgrounds: ICampgroundType["campgrounds"] = [
    "캠핑장1",
    "캠핑장2",
    "캠핑장3",
  ];
  // const campgrounds: ICampgroundType["campgrounds"] = [];

  return (
    <div>
      <Header page={"owner"} />

      {campgrounds.length > 0 ? (
        <>
          <SideTabbar campgrounds={campgrounds} />
          <OwnerContainer />
        </>
      ) : (
        <AddCamping />
      )}
      <Footer />
    </div>
  );
};

export default OwnerPage;
