import { useState, useEffect } from "react";
import { IEmptyNotification } from "@/types/my";
import FreeAlertList from "@/components/my/freeAlert/FreeAlertList";
import Modal from "@/components/@common/Modal/Modal";
import { useMy } from "@/hooks/my/useMy";
import Toast from "@/components/@common/Toast/Toast";
import Lottie from "react-lottie";
import { bellOptions } from "@/assets/lotties/lottieOptions";
import Button from "@/components/@common/Button/Button";

interface FreeAlertProps {
  nickname: string;
}

const FreeAlert = ({ nickname }: FreeAlertProps): JSX.Element => {
  const { useMyAlertsQuery, useDeleteAlert } = useMy();
  const [visibleAlerts, setVisibleAlerts] = useState<IEmptyNotification[]>([]);
  const [viewCount, setIsViewCount] = useState<number>(2); // 처음 보여줄 빈자리 알림 개수 관리
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // roomId 식별번호 (삭제 시 사용)

  // 데이터가 로드되었을 때 초기 목록 설정 (2개씩 잘라서 보여줌)
  useEffect(() => {
    if (useMyAlertsQuery.data) {
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
          Toast.info("빈자리 알림이 정상적으로 취소되었습니다 😊");
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
          width="w-[35%]"
          hasIcon={false}
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="flex flex-col items-center text-center text-BLACK">
            <div className="bg-SUB_YELLOW w-[160px] h-[160px] flex items-center rounded-full">
              <Lottie options={bellOptions} height={120} width={120} />
            </div>
            <h3 className="text-xl font-bold pt-5">빈자리 알림 취소</h3>
            <div className="text-sm pt-2">
              <p>빈자리 알림 취소 시 알림 및 문자를 받을 수 없어요.</p>
              <p>정말 빈자리 알림을 취소하시겠습니까?</p>
            </div>
          </div>
          <div className="flex justify-evenly pt-5">
            <Button
              text="아니요"
              backgroundColor="bg-GRAY"
              hoverBackgroundColor="hover:bg-[#acacac]"
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 중단
                setShowConfirmModal(false);
              }}
            />
            <Button
              text="취소할게요"
              backgroundColor="bg-MAIN_PINK"
              hoverBackgroundColor="hover:bg-MAIN_RED"
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 중단
                confirmCancelAlert;
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FreeAlert;
