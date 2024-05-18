import { useState, useEffect } from "react";
import { IEmptyNotification } from "@/types/my";
import FreeAlertList from "@/components/my/freeAlert/FreeAlertList";
import Modal from "@/components/@common/Modal/Modal";
import { useMy } from "@/hooks/my/useMy";
import Toast from "@/components/@common/Toast/Toast";
import Lottie from "react-lottie";
import {
  bellOptions,
  loadingOptions,
  tentOptions,
  warningOptions,
} from "@/assets/lotties/lottieOptions";
import Button from "@/components/@common/Button/Button";
import { FaRegFaceSmileWink } from "react-icons/fa6";

interface FreeAlertProps {
  nickname: string;
}

const FreeAlert = ({ nickname }: FreeAlertProps): JSX.Element => {
  const { useMyAlertsQuery, useDeleteAlert } = useMy();
  const [visibleAlerts, setVisibleAlerts] = useState<IEmptyNotification[]>([]);
  const [viewCount, setIsViewCount] = useState<number>(3); // 처음 보여줄 빈자리 알림 개수 관리
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
    const newCount = Math.min(viewCount + 3, emptyNotificationList.length);
    setIsViewCount(newCount);
    setVisibleAlerts(emptyNotificationList.slice(0, newCount));
  };

  // 줄이기
  const handleShowLessAlerts = () => {
    const newCount = Math.max(viewCount - 3, 3);
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
        {emptyNotificationList.length > 0 && (
          <>
            <h1 className="text-sm text-gray-400 flex items-center gap-1">
              {nickname}님이 빈자리 알림을 설정한 캠핑장입니다
              <FaRegFaceSmileWink />
            </h1>
          </>
        )}
      </div>

      {useMyAlertsQuery.isLoading && (
        <>
          {/* 로딩중 처리 */}
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={loadingOptions} height={200} width={300} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-base font-bold text-[#A0A0A0]">로딩 중...</h3>
              <p>잠시만 기다려주세요 😀</p>
            </div>
          </div>
        </>
      )}

      {useMyAlertsQuery.isError && (
        <>
          {/* 데이터 에러 발생 시 처리 */}
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={warningOptions} height={180} width={250} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-lg text-BLACK font-bold">
                다시 시도해주세요
              </h3>
              <p className="pt-2">빈자리 알림을 가져오지 못했습니다. 😭</p>
              <p className="">불편을 드려 죄송합니다.</p>
            </div>
          </div>
        </>
      )}

      <div className="max-h-[500px] overflow-y-auto relative">
        {!useMyAlertsQuery.isLoading &&
        !useMyAlertsQuery.isError &&
        emptyNotificationList.length > 0 ? (
          <>
            {/* 빈자리 알림 설정한 더미데이터 리스트 */}
            <FreeAlertList
              alerts={visibleAlerts}
              handleCancelAlert={(roomId) => handleCancelAlert(roomId)}
              viewCount={viewCount}
              handleShowMoreAlerts={handleShowMoreAlerts}
              handleShowLessAlerts={handleShowLessAlerts}
              totalMyAlerts={emptyNotificationList.length}
            />
          </>
        ) : (
          <>
            {/* 빈자리 알림이 없을 때 처리 */}
            {!useMyAlertsQuery.isLoading && !useMyAlertsQuery.isError && (
              <div className="flex flex-col justify-center items-center h-[450px]">
                <div>
                  <Lottie options={tentOptions} height={300} width={500} />
                </div>
                <div className="text-center text-sm text-GRAY">
                  <h3 className="text-base text-BLACK">
                    빈자리 알림을 신청한{" "}
                    <span className="text-MAIN_GREEN">캠핑장</span>이 없어요 😥
                  </h3>
                  <p className="pt-2">
                    마음에 드는 캠핑장에 알림을 신청해보세요 !
                  </p>
                  <p>빈자리가 생기면 캠푸가 바로 알려드려요</p>
                </div>
              </div>
            )}
          </>
        )}
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
              onClick={confirmCancelAlert}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FreeAlert;
