import { useSelector, useDispatch } from "react-redux";
import { setTab } from "@/features/owner/OwnerTabSlice";
import { RootState } from "@/app/store";

interface ITabBarProps {
  leftTab: string;
  middleTab: string;
  rightTab: string;
}

const OwnerTabbar: React.FC<ITabBarProps> = ({
  leftTab,
  middleTab,
  rightTab,
}) => {
  const dispatch = useDispatch();
  const tab = useSelector((state: RootState) => state.ownerTab.tab);

  const handleTabClick = (selectedTab: "내 캠핑장" | "예약 관리" | "리뷰") => {
    dispatch(setTab(selectedTab));
  };

  return (
    <>
      <div className="w-full flex relative text-sm pb-2 text-center py-4">
        <button
          className={
            tab === "내 캠핑장"
              ? "font-bold flex-1 text-MAIN_GREEN"
              : "text-gray-400 flex-1 "
          }
          onClick={() => handleTabClick("내 캠핑장")}
        >
          <p>{leftTab}</p>
        </button>
        <button
          className={
            tab === "예약 관리"
              ? "font-bold flex-1 text-MAIN_GREEN"
              : "text-gray-400 flex-1 "
          }
          onClick={() => handleTabClick("예약 관리")}
        >
          <p>{middleTab}</p>
        </button>
        <button
          className={
            tab === "리뷰"
              ? "font-bold flex-1 text-MAIN_GREEN"
              : "text-gray-400 flex-1"
          }
          onClick={() => handleTabClick("리뷰")}
        >
          <p>{rightTab}</p>
        </button>
        <button className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300 text-MAIN_GREEN">
          <div
            className={`${
              tab === "내 캠핑장"
                ? "left-0"
                : tab === "예약 관리"
                ? "left-1/3"
                : "left-2/3"
            } duration-500 ease-in-out relative bottom-[2px] z-5 w-1/3 h-[3px] bg-MAIN_GREEN`}
          ></div>
        </button>
      </div>
    </>
  );
};

export default OwnerTabbar;
