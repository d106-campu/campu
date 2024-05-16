import { useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Toast from "@/components/@common/Toast/Toast";
import Button from "@/components/@common/Button/Button";
import Lottie from "react-lottie";
import usePayment from "@/hooks/payment/usePayment";
import { warningOptions } from "@/assets/lotties/lottieOptions";
import { IPaymentCancelReq } from "@/types/payment";

interface ICancelModalProps {
  toggleModal: () => void;
  reservationId: number;
  impUid: string;
}

const CancelPaymentModal = ({
  toggleModal,
  reservationId,
  impUid,
}: ICancelModalProps) => {
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const radioClass: string =
    "h-4 w-4 text-MAIN_PINK border-gray-300 focus:ring-MAIN_PINK focus:ring-1";

  // 결제 취소하기
  const { cancelPaymentMutation } = usePayment();
  const handleCancelPayment = () => {
    if (cancelReason === "") {
      Toast.error("취소사유를 선택해주세요. 필수사항입니다.");
      return;
    }
    const cancelData: IPaymentCancelReq = {
      reservationId: reservationId,
      impUid: impUid,
      reason: cancelReason,
    };
    cancelPaymentMutation.mutate(cancelData);
    toggleModal();
  };

  return (
    <>
      <Modal width="w-[35%]" onClose={toggleModal} hasIcon={false}>
        <Lottie options={warningOptions} height={110} width={150} speed={0.5} />
        {!isCancel && (
          <>
            <div className="text-center text-BLACK">
              <h3 className="text-xl font-bold">결제 취소</h3>
              <div className="text-sm pt-3">
                <p>결제 취소 시 되돌릴 수 없습니다.</p>
                <p>정말 결제를 취소하시겠습니까?</p>
              </div>
            </div>
            <div className="flex justify-evenly pt-5">
              <Button
                text="아니요"
                backgroundColor="bg-GRAY"
                hoverBackgroundColor="hover:bg-[#acacac]"
                onClick={toggleModal}
              />
              <Button
                text="취소할게요"
                backgroundColor="bg-MAIN_PINK"
                hoverBackgroundColor="hover:bg-MAIN_RED"
                onClick={() => setIsCancel(!isCancel)}
              />
            </div>
          </>
        )}
        {isCancel && (
          <>
            <div className="flex flex-col items-center text-center text-BLACK">
              <h3 className="text-xl font-bold">결제 취소</h3>
              <p className="text-sm pt-3">
                취소사유를 선택해주세요
                <span className="text-MAIN_RED pl-1">(필수사항)</span>
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <input
                    id="reason1"
                    type="radio"
                    name="cancelReason"
                    value="일정 변경"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason1" className="ml-2 block text-sm">
                    일정 변경
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reason2"
                    type="radio"
                    name="cancelReason"
                    value="날씨 문제"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason2" className="ml-2 block text-sm">
                    날씨 문제
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reason3"
                    type="radio"
                    name="cancelReason"
                    value="개인적인 사정"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason3" className="ml-2 block text-sm">
                    개인적인 사정
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reason4"
                    type="radio"
                    name="cancelReason"
                    value="건강 문제"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason4" className="ml-2 block text-sm">
                    건강 문제
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reason5"
                    type="radio"
                    name="cancelReason"
                    value="다른 예약과 중복"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason5" className="ml-2 block text-sm">
                    다른 예약과 중복
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reason6"
                    type="radio"
                    name="cancelReason"
                    value="기타"
                    className={radioClass}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label htmlFor="reason6" className="ml-2 block text-sm">
                    기타
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly pt-6">
              <Button
                text="취소하기"
                backgroundColor="bg-GRAY"
                hoverBackgroundColor="hover:bg-[#acacac]"
                onClick={toggleModal}
              />
              <Button
                text="확인"
                backgroundColor="bg-MAIN_PINK"
                hoverBackgroundColor="hover:bg-MAIN_RED"
                onClick={handleCancelPayment}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default CancelPaymentModal;
