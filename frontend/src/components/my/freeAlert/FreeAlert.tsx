import { useState } from "react";
import { IMyFreeAlert } from "@/types/myFreeAlert";
import FreeAlertList from "@/components/my/freeAlert/FreeAlertList";
import Modal from '@/components/@common/Modal/Modal';

interface IFreeAlertProps {
  alerts: IMyFreeAlert[];
  totalMyAlerts: number;
}

const FreeAlert = ({
  alerts,
  totalMyAlerts,
}: IFreeAlertProps): JSX.Element => {
  const [visibleAlerts, setVisibleAlerts] = useState<IMyFreeAlert[]>(alerts.slice(0, 2)); // 2개씩 잘라서 보여줌
  const [viewCount, setIsViewCount] = useState<number>(2); // 처음 보여줄 빈자리 알림 개수 관리
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  // 빈자리 알림 취소 모달 관리
  const handleCancelAlert = (alertName: string) => {
    setShowConfirmModal(true);
    setSelectedAlertId(alertName);
  };

  // 빈자리 알림 취소 확정 시 리스트에서 정보 제거 
  const confirmCancelAlert = () => {
    if (selectedAlertId !== null) {
      setVisibleAlerts(prev => prev.filter(alert => alert.campsiteName !== selectedAlertId));
      setShowConfirmModal(false); // 모달 닫기
      setSelectedAlertId(null); // AlertId는 다시 초기화
    }
  };

  // 더보기
  const handleShowMoreAlerts = () => {
    const newCount = Math.min(viewCount + 2, alerts.length);
    setIsViewCount(newCount);
    setVisibleAlerts(alerts.slice(0, newCount));
  };

  // 줄이기
  const handleShowLessAlerts = () => {
    const newCount = Math.max(viewCount - 2, 2);
    setIsViewCount(newCount);
    setVisibleAlerts(alerts.slice(0, newCount));
  };

  return (
  <div className="min-h-[calc(100vh-10rem)]">
    {/* 관심 캠핑장 헤더 */}
    <div className='flex flex-col pb-4'>
      <h1 className='text-lg font-bold'>
        빈자리 알림
        <span className="text-MAIN_GREEN font-thin pl-1">{totalMyAlerts}</span>
      </h1>
      <h1 className="text-sm text-gray-400">"유저 닉네임"님이 빈자리 알림은 설정한 캠핑장입니다.</h1>
    </div>

    <div className='max-h-[500px] overflow-y-auto relative'>
      {/* 빈자리 알림 설정한 더미데이터 리스트 */}
      <FreeAlertList
        alerts={visibleAlerts}
        handleCancelAlert={handleCancelAlert}
        viewCount={viewCount}
        handleShowMoreAlerts={handleShowMoreAlerts}
        handleShowLessAlerts={handleShowLessAlerts}
        totalMyAlerts={totalMyAlerts}
      />
    </div>

    {/* 빈자리 취소 시 모달 호출 */}
    {showConfirmModal && (
      <Modal
        width="w-1/3"
        title="빈자리 알림 취소 확인"
        hasIcon={false}
        onClose={() => setShowConfirmModal(false)}
      >
        <div className="text-center p-1">
          <div className="pt-4">
            <p>이 캠핑장에 대한 빈자리 알림을 <span className='text-red-400'>취소</span>하시겠어요?</p>
          </div>
          <div className="mt-4 flex justify-around">
            <button
              className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
              onClick={confirmCancelAlert}
            >
              <span>취소합니다</span>
            </button>
            <button
              className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
              onClick={() => setShowConfirmModal(false)}
            >
              <span>아니요</span>
            </button>
          </div>
        </div>
      </Modal>
    )}
  </div>
  );
}

export default FreeAlert;