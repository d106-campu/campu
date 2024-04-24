import { useState } from "react";
import AlertMessage from "./AlertMessage";

const AlertLink = ({ hasAlert }: { hasAlert: boolean }) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const toggleOpen = () => [setOpenAlert(!openAlert)];

  return (
    <>
      <div className="flex justify-center flex-grow relative cusor-pointer mx-1 px-4 py-2  hover:bg-SUB_GREEN_01 rounded-md">
        <div
          className="flex items-center justify-center  text-sm  hover:text-MAIN_GREEN"
          onClick={toggleOpen}
        >
          알림
        </div>
        {hasAlert && (
          <span className="absolute top-1 right-8 block h-2.5 w-2.5 rounded-full bg-MAIN_GREEN border-2 border-white"></span>
        )}
      </div>

      {/* 알림 목록 부분 */}
      {openAlert && (
        <div className="absolute top-full right-72 mt-2 w-80 border-2 bg-white shadow-lg rounded-md z-10 p-3">
          <div className="absolute bg-inherit h-5 w-5 rotate-45 transform origin-bottom-right -translate-y-1/2 left-5 top-1 rounded border-t-2 border-l-2"></div>
          <AlertMessage
            nickname={"캐치캠핑핑핑"}
            time={1}
            campingSite={"캠프유캠푸 캠핑장"}
            campingZone={"A구역(벚꽃 캠핑존) 10 "}
            total={3}
            schedule={"24.05.10(금) ~ 05.14 (화) · 4박"}
          />
          {/* 여기에 추가적인 알림 컴포넌트를 넣을 수 있습니다. */}
        </div>
      )}
    </>
  );
};
export default AlertLink;
