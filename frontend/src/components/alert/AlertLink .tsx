import { useState, useEffect, useRef } from "react";
import AlertMessage from "@/components/alert/AlertMessage";
import { useNotify } from "@/hooks/notify/useNotify";
import { useDispatch, useSelector } from "react-redux";
import { resetNewNotifyCnt } from "@/features/notify/notifyCnt";
import { RootState } from "@/app/store";
import Toast from "../@common/Toast/Toast";

const AlertLink = ({ page }: { page?: string }) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const ref = useRef<HTMLDivElement>(null);
  const { useGetNotifyList } = useNotify();
  const dispatch = useDispatch();
  const newNotifyCnt = useSelector(
    (state: RootState) => state.notify.newNotifyCnt
  );

  // 전체 알림 리스트 조회
  const { data: notifyList, refetch } = useGetNotifyList({
    pageable: { size: 100, page: 0 },
  });

  const toggleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(resetNewNotifyCnt());
    if (notifyList!.data.notificationList.content.length > 0) {
      setOpenAlert(!openAlert);
      refetch();
    } else {
      Toast.info("알림함이 비었습니다.");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenAlert(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // 문서 전체에 이벤트 리스너 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, [ref, notifyList]);

  return (
    <div ref={ref} onClick={toggleOpen} className="relative">
      <div
        className={`flex justify-center flex-grow relative cursor-pointer mx-1 px-4 py-2  hover:bg-SUB_GREEN_01 rounded-md  ${
          page === "login"
            ? "hover:bg-white/10 hover:text-white/70"
            : "hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
        }`}
      >
        <div className="flex items-center justify-center text-sm">알림</div>
        {isLogin && newNotifyCnt > 0 && (
          <span className="absolute top-1 right-9 block h-2 w-2 rounded-full bg-MAIN_GREEN border-1 border-white"></span>
        )}
      </div>

      {/* 알림 목록 부분 */}
      {isLogin && openAlert && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute top-full left-0 mt-3.5 w-72 border-2 bg-white shadow-lg rounded-2xl z-10 animate-showUp"
        >
          <div className="relative rounded-2xl pt-4">
            {/* 삼각형 모양 */}
            <div className="bg-white absolute h-6 w-6 rotate-45 transform origin-bottom-right -translate-y-1/2 left-10 top-1 rounded border-t-2 border-l-2" />
            {/* 스크롤 컨테이너 */}
            <div className="overflow-hidden rounded-lg">
              <div className="px-3 max-h-80 overflow-auto">
                <h5 className="px-2 pb-2 text-sm">
                  <span className="text-MAIN_GREEN font-bold">
                    {notifyList?.data.notificationList.content.length}
                  </span>
                  개의 알림이 있습니다.
                </h5>
                {notifyList?.data.notificationList.content.map((alert) => (
                  <AlertMessage key={alert.notificationId} item={alert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlertLink;
