import { useNotify } from "@/hooks/notify/useNotify";
import { INotifySInfo } from "@/types/notify";
import { getTimeDiff } from "@/utils/diffTime";
import { scrollToTop } from "@/utils/scrollToTop";
import { useNavigate } from "react-router-dom";

const AlertMessage = ({ item }: { item: INotifySInfo }) => {
  const { useDeleteNotify } = useNotify();
  // 알림 삭제
  const { mutate: deleteNotify } = useDeleteNotify();

  const navigate = useNavigate();
  const deleteRevservation = () => {
    deleteNotify({ notificationId: item.notificationId });
    navigate(`${item.url}`);
    scrollToTop();
  };

  return (
    <div onClick={() => deleteRevservation()} className="pb-3 cursor-pointer">
      <div className="px-5 pb-5 pt-3 text-sm text-SUB_BLACK bg-SUB_GREEN_01 rounded-lg">
        <p className="text-UNIMPORTANT_TEXT_02 text-xs text-end pb-2 pt-0">
          {getTimeDiff(item.createTime)}
        </p>
        <p>
          <span className="text-MAIN_GREEN font-bold"> {item.message}</span> 😊
        </p>
        <div className="py-2 text-xs font-bold text-black">
          <p>상세 내용</p>
          <ul className="pl-3 list-disc list-outside ">
            <li>{item.name}</li>
            <li>{item.date}</li>
            <li>{item.no}</li>
          </ul>
        </div>
        <p className="text-MAIN_GREEN text-xs pt-1">
          클릭 시 상세 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
};
export default AlertMessage;
