import { axiosAuthInstance } from "@/apis/axiosInstance";

// 결제 준비
export const preparePayment = async (data: any) => {
  const response = await axiosAuthInstance.post("/payment/prepare", data);
  return response.data;
};

// 결제 완료
export const completePayment = async (data: any) => {
  const response = await axiosAuthInstance.post("/payment/complete", data);
  return response.data;
};

// 결제 취소
export const cancelPayment = async (data: any) => {
  const response = await axiosAuthInstance.delete("/payment/cancel", { data });
  return response.data;
};
