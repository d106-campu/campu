import { useState, useEffect } from "react";
import { IEmptyNotification } from "@/types/my";
import FreeAlertList from "@/components/my/freeAlert/FreeAlertList";
import Modal from "@/components/@common/Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useMy } from "@/hooks/my/useMy";
import Toast from "@/components/@common/Toast/Toast";

const FreeAlert = (): JSX.Element => {
  const { useMyAlertsQuery, useDeleteAlert } = useMy();
  const nickname = useSelector((state: RootState) => state.auth.nickname); // 닉네임
  const [visibleAlerts, setVisibleAlerts] = useState<IEmptyNotification[]>([]);
  const [viewCount, setIsViewCount] = useState<number>(2); // 처음 보여줄 빈자리 알림 개수 관리
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // roomId 식별번호 (삭제 시 사용)

  // 데이터가 로드되었을 때 초기 목록 설정 (2개씩 잘라서 보여줌)
  useEffect(() => {
    if (useMyAlertsQuery.data) {
      console.log(
        "빈자리 알림 데이터 :",
        useMyAlertsQuery.data.data.emptyNotificationList
      );
      useMyAlertsQuery.data.data.emptyNotificationList.forEach((arr, index) => {
        console.log(`항목 ${index}의 roomId 값 :`, arr.room.roomId);
      });
      setVisibleAlerts(
        useMyAlertsQuery.data.data.emptyNotificationList.slice(0, viewCount)
      );
    }
  }, [useMyAlertsQuery.data, viewCount]);

  // "나의 빈자리알림" 목록 조회 API 요청 -> myAlertsQuery 호출하여 데이터 접근
  // "??" 기준으로 좌측 피연산자가 null(undefined)일 경우 우측의 빈 배열을 반환하도록 설정
  const emptyNotificationList =
    useMyAlertsQuery.data?.data.emptyNotificationList ?? [];

  // 로딩 중일 때 처리
  if (useMyAlertsQuery.isLoading) {
    return <div>로딩 중... 잠시만 기다려주세요 😀</div>;
  }

  // 데이터 에러 발생 시 처리
  if (useMyAlertsQuery.isError) {
    return <div>빈자리 알림을 가져오지 못했습니다. 😭</div>;
  }

  // 빈자리 알림이 아직 하나도 없을 때 처리
  if (!emptyNotificationList || emptyNotificationList.length === 0) {
    return (
      <>
        <div>
          <div className="flex flex-col pb-10">
            <h1 className="text-lg font-bold">
              빈자리 알림
              <span className="text-MAIN_GREEN font-thin pl-1">0</span>
            </h1>
            <h1 className="text-sm text-gray-400">
              {nickname}님이 빈자리 알림은 설정한 캠핑장입니다.
            </h1>
          </div>
          <div className="text-center">
            <h1 className="">
              빈자리 알림을 신청한{" "}
              <span className="text-MAIN_GREEN">캠핑장</span>이 없어요 😃
            </h1>
            <h1 className="text-sm text-GRAY pt-2">
              원하는 캠핑장 정보에 알림을 신청해보세요 !
            </h1>
          </div>
        </div>
      </>
    );
  }

  // 빈자리 알림 취소 모달 관리
  const handleCancelAlert = (roomId: number) => {
    setShowConfirmModal(true);
    setSelectedRoomId(roomId);
  };

  // 빈자리 알림 취소 확정 시 리스트에서 정보 제거
  const confirmCancelAlert = () => {
    if (selectedRoomId !== null) {
      // 빈자리 알림 DELETE 요청 API 연결
      useDeleteAlert.mutate(selectedRoomId, {
        onSuccess: () => {
          // 성공적으로 삭제 처리 후 상태 업데이트
          setVisibleAlerts((prev) =>
            prev.filter((alert) => alert.room.roomId !== selectedRoomId)
          );
          setShowConfirmModal(false); // 모달 닫기
          setSelectedRoomId(null);
          Toast.success("성공적으로 알림을 취소했습니다.");
        },
        onError: (error) => {
          console.error("빈자리 알림 삭제 실패:", error);
          Toast.error("일시적 오류로 취소하지 못했습니다.");
        },
      });
    }
  };

  // 더보기
  const handleShowMoreAlerts = () => {
    const newCount = Math.min(viewCount + 2, emptyNotificationList.length);
    setIsViewCount(newCount);
    setVisibleAlerts(emptyNotificationList.slice(0, newCount));
  };

  // 줄이기
  const handleShowLessAlerts = () => {
    const newCount = Math.max(viewCount - 2, 2);
    setIsViewCount(newCount);
    setVisibleAlerts(emptyNotificationList.slice(0, newCount));
  };

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      {/* 관심 캠핑장 헤더 */}
      <div className="flex flex-col pb-4">
        <h1 className="text-lg font-bold">
          빈자리 알림
          <span className="text-MAIN_GREEN font-thin pl-1">
            {emptyNotificationList.length}
          </span>
        </h1>
        <h1 className="text-sm text-gray-400">
          {nickname}님이 빈자리 알림은 설정한 캠핑장입니다.
        </h1>
      </div>

      <div className="max-h-[500px] overflow-y-auto relative">
        {/* 빈자리 알림 설정한 더미데이터 리스트 */}
        <FreeAlertList
          alerts={visibleAlerts}
          handleCancelAlert={(roomId) => handleCancelAlert(roomId)}
          viewCount={viewCount}
          handleShowMoreAlerts={handleShowMoreAlerts}
          handleShowLessAlerts={handleShowLessAlerts}
          totalMyAlerts={emptyNotificationList.length}
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
              <p>
                이 캠핑장에 대한 빈자리 알림을{" "}
                <span className="text-red-400">취소</span>하시겠어요?
              </p>
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
};

export default FreeAlert;
