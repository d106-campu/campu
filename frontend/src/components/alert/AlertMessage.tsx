import { INotifySInfo } from "@/types/notify";
import { getTimeDiff } from "@/utils/diffTime";
import { scrollToTop } from "@/utils/scrollToTop";
import { useNavigate } from "react-router-dom";

const AlertMessage = ({ item }: { item: INotifySInfo }) => {
  const navigate = useNavigate();
  const goToRevservation = (campId: number) => {
    navigate(`/camps/${campId}`);
    scrollToTop();
  };

  return (
    <div
      onClick={() => goToRevservation(item.notificationId)}
      className="pb-3 cursor-pointer"
    >
      <div className="px-5 pb-5 pt-3 text-sm text-SUB_BLACK bg-SUB_GREEN_01 rounded-lg">
        <>
          <p className="text-UNIMPORTANT_TEXT_02 text-xs text-end pb-2 pt-0">
            {getTimeDiff(item.createTime)}
          </p>
          <p>
            기다리신
            <span className="text-MAIN_GREEN font-bold"> {item.name}</span>의
            빈자리가 나왔어요! 지금 바로 예약 해보세요 😊
          </p>
          <div className="py-2 text-xs font-bold text-black">
            <ul className="pl-3 list-disc list-outside ">
              <li>{item.name}</li>
              <li>{item.date}</li>
              <li>{item.no}</li>
            </ul>
          </div>

          <p>서둘러 주세요, 자리가 금방 차버릴 수 있어요!</p>
          <p className="text-MAIN_GREEN text-xs pt-1">
            클릭 시 예약 페이지로 이동합니다.
          </p>
        </>
      </div>
    </div>
  );
};
export default AlertMessage;
