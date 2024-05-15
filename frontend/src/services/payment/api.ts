import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import {
  IPaymentPrepareRes,
  IPaymentPrepareReq,
  IPaymentCompleteReq,
  IPaymentCompleteRes,
} from "@/types/payment";

// 결제 준비 요청
export const preparePayment = async (
  data: IPaymentPrepareReq
): Promise<APIResponse<IPaymentPrepareRes>> => {
  const res = await axiosAuthInstance.post("/payment/prepare", data);
  return res.data;
};

// 결제 완료 요청
export const completePayment = async (
  data: IPaymentCompleteReq
): Promise<APIResponse<IPaymentCompleteRes>> => {
  const res = await axiosAuthInstance.post("/payment/complete", data);
  return res.data;
};

// 결제 취소 요청
export const cancelPayment = async (data: any) => {
  const res = await axiosAuthInstance.delete("/payment/cancel", { data });
  return res.data;
};
