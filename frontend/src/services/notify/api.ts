import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { INotifyListRes, INotifyReq } from "@/types/notify";

// 로그인 상태 확인 함수
const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
};

// 전체 알람 조회
export const getNotifyList = async ({
  pageable,
}: INotifyReq): Promise<APIResponse<INotifyListRes>> => {
  if (!isUserLoggedIn()) {
    return Promise.reject(new Error("로그인 시에만 api 호출"));
  }
  const data = await axiosAuthInstance.get(`/notification/list`, {
    params: {
      ...pageable,
    },
  });
  return data.data;
};
