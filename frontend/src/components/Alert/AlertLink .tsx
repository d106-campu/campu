import { useState } from "react";
import AlertMessage from "@/components/alert/AlertMessage";

const AlertLink = ({ hasAlert }: { hasAlert: boolean }) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const toggleOpen = () => [setOpenAlert(!openAlert)];

  return (
    <div className="relative">
      <div className=" flex justify-center flex-grow relative cusor-pointer mx-1 px-4 py-2  hover:bg-SUB_GREEN_01 rounded-md">
        <div
          className="flex items-center justify-center text-sm  hover:text-MAIN_GREEN"
          onClick={toggleOpen}
        >
          알림
        </div>
        {hasAlert && (
          <span className="absolute top-1 right-9 block h-2 w-2 rounded-full bg-MAIN_GREEN border-1 border-white"></span>
        )}
      </div>

      {/* 알림 목록 부분 */}
      {openAlert && (
        <div className="absolute top-full left-0 mt-4 w-72 border-2 bg-white shadow-lg rounded-xl z-10 animate-ShowUp">
          <div className="relative rounded-xl pt-4">
            {/* 삼각형 모양 */}
            <div className="bg-white absolute h-6 w-6 rotate-45 transform origin-bottom-right -translate-y-1/2 left-10 top-1 rounded border-t-2 border-l-2" />
            {/* 스크롤 컨테이너 */}
            <div className="overflow-hidden rounded-lg">
              <div className="px-3 max-h-80 overflow-auto">
                <h5 className="px-2 pb-2 text-sm">
                  <span className="text-MAIN_GREEN font-bold">3</span> 개의
                  새로운 알림이 있습니다.
                </h5>
                <AlertMessage
                  nickname={"캐치캠핑핑핑"}
                  time={1}
                  campingSite={"캠프유캠푸 캠핑장"}
                  campingZone={"A구역(벚꽃 캠핑존) 10 "}
                  total={3}
                  schedule={"24.05.10(금) ~ 05.14 (화) · 4박"}
                />
                <AlertMessage
                  nickname={"캐치캠핑핑핑"}
                  time={1}
                  campingSite={"캠프유캠푸 캠핑장"}
                  campingZone={"A구역(벚꽃 캠핑존) 10 "}
                  total={3}
                  schedule={"24.05.10(금) ~ 05.14 (화) · 4박"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlertLink;
