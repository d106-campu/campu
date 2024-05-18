import { FaBell } from "react-icons/fa";
import { IEmptyNotification } from "@/types/my";
import { useNavigate } from "react-router-dom";
import Button from "@/components/@common/Button/Button";
import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
import { diffDays } from "@/utils/diffDays";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    <>
      <div className="grid grid-cols-3 gap-4">
        {alerts.map((alert, index) => (
          <div key={index} className="w-[95%] m-2 min-w-[280px]">
            <div className="flex flex-col justify-center w-full p-5 text-sm bg-white text-SUB_BLACK rounded-br-2xl rounded-bl-2xl shadow-lg">
              {/* 캠핑장 이름 */}
              <h3 className="font-bold text-lg p-1">
                {alert.room.campsite.campsiteName}
              </h3>
              <div className="flex items-center text-gray-400 gap-1 text-xs pb-1">
                <FiMapPin className="text-gray-400 flex-shrink-0" size={10} />
                <p className="line-clamp-1">{alert.room.campsite.address}</p>
              </div>
              <img
                src={alert.room.campsite.thumbnailImageUrl}
                alt={alert.room.campsite.campsiteName}
                className="object-center object-cover h-[130px] rounded-lg overflow-hidden my-1 mb-5"
              />

              {/* 구분선 */}
              <div className="border-t-2 w-full p-2" />

              {/* 날짜 */}
              <div className="px-2">
                <h5 className="text-gray-400 text-xs">날짜</h5>
                <p className="font-bold">{`${formatDate(
                  alert.startDate
                )} - ${formatSimpleDate(alert.endDate)} · ${diffDays(
                  alert.startDate,
                  alert.endDate
                )}박`}</p>

                {/* 사이트 */}
                <div className="flex justify-between pr-3">
                  <div>
                    <h5 className="text-gray-400 text-xs pt-2">사이트</h5>
                    <p className="font-bold">{alert.room.roomName}</p>
                  </div>

                  {/* 입 퇴실 시간 */}
                  <div>
                    <h5 className="text-gray-400 text-xs pt-2">
                      입 · 퇴실 시간
                    </h5>
                    <p className="font-bold">
                      {`${alert.room.campsite.checkin || "13:00"} - ${
                        alert.room.campsite.checkout || "11:00"
                      }`}
                    </p>
                  </div>
                </div>
              </div>
              {/* 버튼 + 절취선 */}
            </div>
            <div className="w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed">
              <Button
                width="w-[45%]"
                text="캠핑장 가기"
                textColor="text-[#3A2929]"
                fontWeight="none"
                backgroundColor="bg-[#E3F0E5]"
                hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
                onClick={() =>
                  navigate(`/camps/${alert.room.campsite.campsiteId}`)
                }
              />
              <Button
                onClick={(event: React.MouseEvent) => {
                  handleCancelAlert(alert.room.roomId);
                  event.stopPropagation();
                }}
                width="w-[45%]"
                text="알림 취소"
                textColor="text-[#3A2929]"
                icon={FaBell}
                iconColor="#fdd872"
                iconSize={20}
                backgroundColor="bg-SUB_YELLOW"
                hoverBackgroundColor="hover:bg-HOVER_YELLOW"
                fontWeight="font"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-3">
        {viewCount < totalMyAlerts && (
          <button onClick={handleShowMoreAlerts} className="mx-12 py-2">
            <IoIosArrowDown />
          </button>
        )}
        {viewCount > 3 && (
          <button onClick={handleShowLessAlerts} className="mx-12 py-2">
            <IoIosArrowUp />
          </button>
        )}
      </div>
    </>
  );
};

export default FreeAlertList;
