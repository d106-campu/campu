import { FaBell } from "react-icons/fa";
import { IEmptyNotification } from "@/types/myFreeAlert";

interface IFreeAlertListProps {
  alerts: IEmptyNotification[];
  handleCancelAlert: (campsiteId: number) => void;
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
  totalMyAlerts
}: IFreeAlertListProps) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {alerts.map((alert, index) => (
        <div key={index} className="w-full flex justify-center p-2 pb-3 shadow-lg rounded-xl bg-white">
          <div className="w-[45%] px-1">
            <div className="flex flex-col">
              <h2 className="text-lg">{alert.room.campsite.campsiteName}</h2>
              <img
                src={alert.room.campsite.thumbnailImageUrl}
                alt={alert.room.campsite.campsiteName}
                className="w-[300px] h-[150px] object-cover object-center rounded-lg mt-2"
              />
            </div>
          </div>

          <div className="w-[50%] text-sm pt-8">
            <div className="py-1">
              <h1 className="text-GRAY">캠핑장 위치</h1>
              <p className="font-bold">{alert.room.campsite.address}</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <h1 className="text-GRAY">날짜</h1>
                {/* 입실일 ~ 퇴실일 */}
                <p>
                  <span className="text-MAIN_GREEN">{alert.startDate}</span> ~ <span className="text-red-500">{alert.endDate}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <h1 className="text-GRAY">사이트</h1>
                <p className="text-MAIN_GREEN font-bold">{alert.room.roomName}</p>
              </div>
              <div>
                <button
                  className="flex items-center bg-SUB_YELLOW hover:bg-yellow-200 rounded-lg px-2 py-1"
                  onClick={() => handleCancelAlert(alert.room.campsite.campsiteId)}
                >
                  <FaBell className="text-yellow-500"/>
                  <span className="text-gray-600 hover:text-MAIN_GREEN pl-2">빈자리 알림 취소</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='flex justify-center pt-3'>
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
}

export default FreeAlertList;