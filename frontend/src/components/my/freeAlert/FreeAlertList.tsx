import { FaBell } from "react-icons/fa";
import { IMyFreeAlert } from "@/types/myFreeAlert";

interface IFreeAlertListProps {
  alerts: IMyFreeAlert[];
  handleCancelAlert: (campsiteName: string) => void;
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
        <div key={index} className="w-full flex justify-center p-2 shadow-lg rounded-lg bg-white">
          <div className="w-[45%] px-1">
            <div className="flex flex-col">
              <h2 className="text-lg">{alert.campsiteName}</h2>
              <img
                src={alert.images[0]}
                alt={alert.campsiteName}
                className="w-[300px] h-[150px] object-cover object-center rounded-lg mt-2"
              />
            </div>
          </div>

          <div className="w-[50%] text-sm">
            <div className="flex justify-end">
              <button
                className="flex items-center bg-SUB_YELLOW hover:bg-yellow-200 rounded-lg px-2 py-1"
                onClick={() => handleCancelAlert(alert.campsiteName)}
              >
                <FaBell className="text-yellow-500"/>
                <span className="text-gray-600 hover:text-MAIN_GREEN pl-2">빈자리 알림 취소</span>
              </button>
            </div>
            <div className="py-1">
              <h1 className="text-GRAY">캠핑장 위치</h1>
              <p>{alert.address}</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <h1 className="text-GRAY">날짜</h1>
                <p>{alert.date}</p>
              </div>
              <div className="px-2">
                <h1 className="text-GRAY">인원</h1>
                <p>{alert.people}명</p>
              </div>
            </div>
            <div className="flex justify-between items-start py-2">
              <div>
                <h1 className="text-GRAY">사이트</h1>
                <p>{alert.area}</p>
              </div>
              <div className="px-2">
                <h1 className="text-GRAY">가격</h1>
                <p className="text-lg text-red-500">{alert.price.toLocaleString()}원</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='flex justify-center mt-4'>
        {viewCount < totalMyAlerts && (
          <button onClick={handleShowMoreAlerts} className="mx-2 px-4 py-2 rounded-lg">
            더보기
          </button>
        )}
        {viewCount > 2 && (
          <button onClick={handleShowLessAlerts} className="mx-2 px-4 py-2 rounded-lg">
            줄이기
          </button>
        )}
      </div>
    </div>
  );
}

export default FreeAlertList;