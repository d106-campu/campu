import { preparePayment, completePayment } from "@/services/payment/api";
import { APIResponse } from "@/types/model";
import {
  IPaymentCompleteReq,
  IPaymentCompleteRes,
  IPaymentPrepare,
  IPaymentPrepareReq,
  IPaymentPrepareRes,
} from "@/types/payment";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

const usePayment = () => {
  // window 객체에서 IMP 가져오기
  const IMP = window.IMP;
  IMP.init("imp60623737"); // 고객사 식별코드로 SDK 초기화

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
        const preparePayment = data.data.prepareResponse;
        console.log("결제 정보: ", preparePayment);
        requestPay(preparePayment); // 결제 서버에 결제 요청
      },
      onError: (error: Error) => {
        console.error("결제 준비 실패: ", error.message);
      },
    });
  };

  // 결제창 열기 - 결제 요청 (결제 서버)
  const requestPay = (preparePayment: IPaymentPrepare) => {
    IMP.request_pay(
      // 결제 정보
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
      (rsp: any) => {
        if (rsp.error_code != null) {
          return alert(`결제 실패: ${rsp.error_msg}`);
        }

        console.log("중간 과정");
        console.log(rsp.imp_uid);

        // API 서버에 결제 정보 확인 요청 (completePaymentMutation 객체의 mutate 메서드를 사용)
        completePaymentMutation.mutate({
          reservationId: rsp.merchant_uid,
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
        const completeResponse = data.data.completeResponse;
        console.log("결제 완료 정보: ", completeResponse);
        // 결제 정보가 같은지 확인
        if (completeResponse.amount === completeResponse.price) {
          alert("결제 성공");
        } else {
          alert("결제 실패");
        }
      },
      onError: (error: Error) => {
        console.error("오류:", error.message);
      },
    });
  };

  // useCompletePayment 훅을 호출하여 반환된 객체를 사용
  const completePaymentMutation = useCompletePayment();

  return { usePreparePayment, useCompletePayment };
};

export default usePayment;
