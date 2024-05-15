import OwnerManageInfo from "@/components/owner/ownerManage/ownerManageInfo/OwnerManageInfo";
import OwnerManagePhoto from "@/components/owner/ownerManage/ownerManagePhoto/OwnerManagePhoto";
import OwnerManageRoom from "@/components/owner/ownerManage/ownerManageroom/OwnerManageRoom";

const OwnerManage = () => {
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
