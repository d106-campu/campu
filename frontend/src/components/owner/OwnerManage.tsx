import OwnerManageInfo from "@/components/owner/OwnerManageInfo";
import OwnerManagePhoto from "@/components/owner/OwnerManagePhoto";
import OwnerManageRoom from "@/components/owner/OwnerManageRoom";

const OwnerManage = ({ selectCampground }:{ selectCampground: string | null }) => {

  console.log(selectCampground)
  return (
    <>
      <div>
        <OwnerManagePhoto />
        <OwnerManageInfo />
        <OwnerManageRoom />
      </div>
    </>
  );
};

export default OwnerManage;
