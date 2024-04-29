import OwnerManageInfo from "@/components/owner/OwnerManageInfo";
import OwnerManagePhoto from "@/components/owner/OwnerManagePhoto";
import OwnerManageRoom from "@/components/owner/OwnerManageRoom";

const OwnerManage = ({
  selectCampground,
}: {
  selectCampground: string | null;
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
