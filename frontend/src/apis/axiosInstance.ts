import axios from "axios";
import refresh from "@/apis/refresh";
import setAuthorization from "@/apis/setAuthorization";

// 인증 필요 없는 기본 axios 인스턴스
const axiosCommonInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? ""
      : import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증이 필요한 axios 인스턴스
const axiosAuthInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? ""
      : import.meta.env.VITE_BASE_URL,
  withCredentials: true, // 쿠키 전송을 위해 필요한 크레덴셜
  headers: {
    "Content-Type": "application/json",
  },
});

// 파일 서버 요청  axios 인스턴스
const axiosFileInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? ""
      : import.meta.env.VITE_IMAGE_BASE_URL_PROD,
  withCredentials: true, // 쿠키 전송을 위해 필요한 크레덴셜
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

// 요청 인터셉터
axiosFileInstance.interceptors.request.use(setAuthorization);
axiosAuthInstance.interceptors.request.use(setAuthorization, (error) =>
  Promise.reject(error)
);

// 응답 인터셉터
axiosFileInstance.interceptors.response.use(null, refresh);
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => refresh(error)
);

export { axiosCommonInstance, axiosAuthInstance, axiosFileInstance };
