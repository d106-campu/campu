import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";
import SideTabbar from "@/components/owner/SideTabbar";
import AddCamping from "@/components/owner/AddCamping";
import { useOwner } from "@/hooks/owner/useOwner";

const OwnerPage = () => {
  const { useGetOwnerCampsiteList } = useOwner();

  // 전체  리스트 조회
  const { data: OwnerCampsiteList } = useGetOwnerCampsiteList({
    pageable: { size: 100, page: 0 },
  });

  console.log(OwnerCampsiteList?.data.campsiteList.content);

  const campsiteData = OwnerCampsiteList?.data.campsiteList.content.map(
    (item) => ({
      id: item.id,
      name: item.facltNm,
    })
  );

  console.log(campsiteData);
  return (
    <div>
      <Header page={"owner"} />

      {OwnerCampsiteList?.data.campsiteList.content ? (
        <>
          <SideTabbar campData={campsiteData!} />
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
