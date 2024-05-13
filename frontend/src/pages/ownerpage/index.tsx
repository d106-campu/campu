import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";
import SideTabbar from "@/components/owner/SideTabbar";
import AddCamping from "@/components/owner/AddCamping";
import { useOwner } from "@/hooks/owner/useOwner";

const OwnerPage = () => {
  const { useGetOwnerCampsiteList } = useOwner();

  // 전체 캠핑장 리스트 조회
  const { data: OwnerCampsiteList } = useGetOwnerCampsiteList({
    pageable: { size: 100, page: 0 },
  });

  console.log(OwnerCampsiteList?.data.campsiteList.content);

  const campground: string[] | undefined =
    OwnerCampsiteList?.data.campsiteList.content.map((item) => item.facltNm);

  console.log(campground);
  return (
    <div>
      <Header page={"owner"} />

      {campground?.length ? (
        <>
          <SideTabbar campgrounds={campground} />
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
