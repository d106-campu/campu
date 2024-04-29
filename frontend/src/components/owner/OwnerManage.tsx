import OwnerManageInfo from "./OwnerManageInfo";
import OwnerManagePhoto from "./OwnerManagePhoto";
import OwnerManageRoom from "./OwnerManageRoom";

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
