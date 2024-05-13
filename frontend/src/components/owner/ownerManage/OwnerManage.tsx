import OwnerManageInfo from "@/components/owner/ownerManage/ownerManageInfo/OwnerManageInfo";
import OwnerManagePhoto from "@/components/owner/ownerManage/ownerManagePhoto/OwnerManagePhoto";
import OwnerManageRoom from "@/components/owner/ownerManage/ownerManageroom/OwnerManageRoom";

const OwnerManage = ({
  selectCampground,
}: {
  selectCampground: number | null;
}) => {
  // @TODO: api 연결 시 props으로 전달해야함
  console.log(selectCampground);
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
