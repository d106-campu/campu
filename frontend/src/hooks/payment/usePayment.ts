import { useState, useEffect } from "react";
import {
  preparePayment,
  completePayment,
  cancelPayment,
} from "@/services/payment/api";
import { APIResponse } from "@/types/model";
import {
  IPaymentCancelReq,
  IPaymentCancelRes,
  IPaymentCompleteReq,
  IPaymentCompleteRes,
  IPaymentPrepare,
  IPaymentPrepareReq,
  IPaymentPrepareRes,
} from "@/types/payment";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  setReservationData,
  updateStatus,
} from "@/features/reservation/ReservationSlice";
import Toast from "@/components/@common/Toast/Toast";

const usePayment = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [IMP, setIMP] = useState<any>(null);
  const [preparePaymentData, setPreparePaymentData] =
    useState<IPaymentPrepare | null>(null);

  // useEffect를 사용하여 결제 준비 데이터와 IMP 객체가 모두 준비되었을 때만 결제 요청을 수행
  useEffect(() => {
    // window 객체에서 IMP 가져오기
    if (typeof window !== "undefined") {
      const imp = window.IMP;
      if (imp) {
        imp.init("imp60623737"); // 고객사 식별코드로 SDK 초기화
        setIMP(imp);
        console.log("IMP 초기화 성공");
      } else {
        console.error("IMP 객체를 초기화할 수 없습니다.");
        return;
      }
    }
  }, []);

  // 결제 준비 요청 (API 서버)
  const usePreparePayment = (): UseMutationResult<
    APIResponse<IPaymentPrepareRes>,
    Error,
    IPaymentPrepareReq
  > => {
    return useMutation({
      mutationKey: ["prepare Payment"],
      mutationFn: preparePayment,
      onSuccess: (data) => {
        const preparePayment = data.data.preparePayment;
        console.log(`결제 정보:  ${preparePayment}`);

        // 예약 아이디 업데이트
        dispatch(
          setReservationData({
            reservationId: preparePayment.reservationId,
          })
        );
        if (!preparePayment) {
          console.error("결제 준비 데이터가 없습니다.");
          return;
        }
        setPreparePaymentData(preparePayment); // 결제 준비 데이터 상태 업데이트
      },
      onError: (error: Error) => {
        console.error(`결제 준비 실패: ${error.message}`);
      },
    });
  };

  // usePreparePayment 훅을 호출하여 반환된 객체를 사용
  const preparePaymentMutation = usePreparePayment();

  // 결제창 열기 - 결제 요청 (결제 서버)
  useEffect(() => {
    if (preparePaymentData && IMP) {
      requestPay(preparePaymentData);
    }
  }, [preparePaymentData, IMP]);

  const requestPay = (preparePayment: IPaymentPrepare) => {
    if (!IMP) {
      console.error("IMP 객체를 초기화할 수 없습니다.");
      return;
    }

    console.log(`결제창 열기 - 결제 정보: ${preparePayment}`);

    // 결제 정보
    IMP.request_pay(
      {
        pg: preparePayment.pg, // "${PG사 코드}.${상점 ID}"
        pay_method: preparePayment.payMethod, // 결제 방법
        merchant_uid: preparePayment.merchantUid, // 주문 고유번호
        name: preparePayment.name, // 상품명
        amount: preparePayment.amount, // 가격
        buyer_email: preparePayment.buyerEmail, // 구매자 이메일
        buyer_name: preparePayment.buyerName, // 구매자 이름
        buyer_tel: preparePayment.buyerTel, // 구매자 전화번호
        buyer_addr: preparePayment.buyerAddr, // 구매자 주소
        buyer_postcode: preparePayment.buyerPostcode, // 구매자 우편번호
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (rsp: any) => {
        console.log(`결제 응답 시작: 결제 응답 - ${rsp} `); // 콜백 함수 시작 로그 - 결제 응답 확인
        if (rsp.error_code != null) {
          console.log(`결제 실패: ${rsp.error_msg}`);
          return Toast.error("결제에 실패했습니다. 다시 시도해주세요");
        }

        console.log(`중간 과정 : ${rsp.imp_uid}`);

        // API 서버에 결제 정보 확인 요청 (completePaymentMutation 객체의 mutate 메서드를 사용)
        completePaymentMutation.mutate({
          reservationId: String(preparePayment.reservationId),
          impUid: rsp.imp_uid,
          merchantUid: rsp.merchant_uid,
        });
      }
    );
  };

  // 결제 완료 요청 (API 서버) - 결제 정보 확인
  const useCompletePayment = (): UseMutationResult<
    APIResponse<IPaymentCompleteRes>,
    Error,
    IPaymentCompleteReq
  > => {
    return useMutation({
      mutationKey: ["complete Payment"],
      mutationFn: completePayment,
      onSuccess: (data) => {
        const completeResponse = data.data.completePayment;
        console.log(`결제 완료 정보: ${completeResponse}`);

        // 결제 정보가 같은지 확인
        if (completeResponse.amount === completeResponse.price) {
          Toast.success("캠핑장 예약 및 결제가 정상적으로 완료되었습니다.");
          // 필요한 정보만 업데이트
          dispatch(
            setReservationData({
              impUid: completeResponse.impUid,
              reservationId: completeResponse.reservationId,
              image: completeResponse.room.campsite.thumbnailImageUrl,
              facltNm: completeResponse.room.campsite.facltNm,
              addr1: completeResponse.room.campsite.addr1,
              addr2: completeResponse.room.campsite.addr2,
              roomId: completeResponse.room.id,
              roomName: completeResponse.room.name,
              headCnt: completeResponse.headCnt,
              totalPrice: completeResponse.price,
              startDate: completeResponse.startDate,
              endDate: completeResponse.endDate,
            })
          );
          dispatch(updateStatus("complete"));
        } else {
          Toast.error("결제에 실패했습니다. 다시 시도해주세요");
        }
      },
      onError: (error: Error) => {
        console.error(`오류: ${error.message}`);
      },
    });
  };

  // useCompletePayment 훅을 호출하여 반환된 객체를 사용
  const completePaymentMutation = useCompletePayment();

  // 결제 취소 요청
  const useCancelPayment = (): UseMutationResult<
    APIResponse<IPaymentCancelRes>,
    Error,
    IPaymentCancelReq
  > => {
    return useMutation({
      mutationKey: ["cancel Payment"],
      mutationFn: cancelPayment,
      onSuccess: (data) => {
        const cancelPayment = data.data.cancelPayment;
        console.log("결제 취소 완료: ", cancelPayment);
        Toast.success("결제가 성공적으로 취소되었습니다.");
        dispatch(updateStatus("proceeding"));
      },
      onError: (error: Error) => {
        console.error(`결제 취소 실패: ${error.message}`);
        Toast.error("결제 취소에 실패했습니다. 다시 시도해주세요");
      },
    });
  };

  // useCancelPayment 훅을 호출하여 반환된 객체를 사용
  const cancelPaymentMutation = useCancelPayment();

  return {
    preparePaymentMutation,
    completePaymentMutation,
    cancelPaymentMutation,
  };
};

export default usePayment;
