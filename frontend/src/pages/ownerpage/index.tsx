import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import OwnerContainer from "@/components/owner/OwnerContainer";
import SideTabbar from "@/components/owner/SideTabbar";
import { useOwner } from "@/hooks/owner/useOwner";

const OwnerPage = () => {
  const { useGetOwnerCampsiteList } = useOwner();

  // 전체  리스트 조회
  const { data: OwnerCampsiteList } = useGetOwnerCampsiteList({
    pageable: { size: 100, page: 0 },
  });

  const campsiteData = OwnerCampsiteList?.data.campsiteList.content.map(
    (item) => ({
      id: item.id,
      name: item.facltNm,
    })
  );

  return (
    <div>
      <Header page={"owner"} />
      <div className="w-full flex">
        <div className="min-w-[5%]">
          <SideTabbar campData={campsiteData!} />
        </div>
        <div className="w-full">
          <OwnerContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerPage;
