import { FaBell } from "react-icons/fa";
import { IEmptyNotification } from "@/types/my";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "@/components/@common/Button/Button";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";

interface IFreeAlertListProps {
  alerts: IEmptyNotification[];
  handleCancelAlert: (roomId: number) => void;
  viewCount: number;
  handleShowMoreAlerts: () => void;
  handleShowLessAlerts: () => void;
  totalMyAlerts: number;
}

const FreeAlertList = ({
  alerts,
  handleCancelAlert,
  viewCount,
  handleShowMoreAlerts,
  handleShowLessAlerts,
  totalMyAlerts,
}: IFreeAlertListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4">
      {alerts.map((alert, index) => (
        <div
          key={index}
          onClick={() => navigate(`/camps/${alert.room.campsite.campsiteId}`)}
          className="w-[90%] mx-auto flex justify-center p-4 shadow-lg rounded-xl bg-white cursor-pointer"
        >
          <div className="flex flex-col w-[50%] px-1">
            <button className="flex items-center text-lg font-bold text-BLACK pl-2 ">
              {alert.room.campsite.campsiteName}
              <RiArrowRightSLine className="pl-1" />
            </button>
            <img
              src={alert.room.campsite.thumbnailImageUrl}
              alt={alert.room.campsite.campsiteName}
              className="w-[95%] h-[150px] object-cover object-center rounded-lg mx-auto mt-2"
            />
          </div>

          <div className="w-[55%] flex items-center text-sm pl-5 p-3">
            <div className="w-full flex flex-col gap-4 text-gray-400">
              <div>
                <h3>사이트</h3>
                <p className="pb-1 font-bold text-BLACK">
                  {alert.room.roomName}
                </p>
              </div>

              <div>
                <h3>캠핑장 위치</h3>
                <p className="pb-1 font-bold text-BLACK">
                  {`${alert.room.campsite.address}`}
                </p>
              </div>
              <div className="flex justify-between items-end gap-1">
                <div>
                  <h3>일정</h3>
                  <p className="pb-1 font-bold text-BLACK">
                    {`
                    ${formatDate(alert.startDate)} ~
                    ${formatSimpleDate(alert.endDate)} ·
                    ${diffDays(alert.startDate, alert.endDate)}박`}
                  </p>
                </div>
                {/* 버튼 */}
                <Button
                  onClick={(event: React.MouseEvent) => {
                    handleCancelAlert(alert.room.roomId);
                    event.stopPropagation();
                  }}
                  width="w-44"
                  text="빈자리 알림 취소"
                  icon={FaBell}
                  iconColor="#fdd872"
                  iconSize={20}
                  backgroundColor="bg-SUB_YELLOW"
                  hoverBackgroundColor="hover:bg-HOVER_YELLOW"
                  textColor="text-BLACK"
                  fontWeight="font"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center pt-3">
        {viewCount < totalMyAlerts && (
          <button onClick={handleShowMoreAlerts} className="mx-2 py-2">
            더보기
          </button>
        )}
        {viewCount > 2 && (
          <button onClick={handleShowLessAlerts} className="mx-2 py-2">
            줄이기
          </button>
        )}
      </div>
    </div>
  );
};

export default FreeAlertList;
