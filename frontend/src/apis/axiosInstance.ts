import axios from 'axios';
// import refresh from '@/apis/refresh';
import setAuthorization from '@/apis/setAuthorization';

// 환경 변수로부터 baseURL 가져오기
const baseURL = import.meta.env.VITE_BASE_URL;

// 인증 필요 없는 기본 axios 인스턴스
const axiosCommonInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인증이 필요한 axios 인스턴스
const axiosAuthInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // 쿠키 전송을 위해 필요한 크레덴셜
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
axiosAuthInstance.interceptors.request.use(setAuthorization, error => Promise.reject(error));

// 응답 인터셉터
axiosAuthInstance.interceptors.response.use(
  response => response,
  // refresh  // 토큰 만료의 경우 401 인증 실패를 처리하기 위해 refresh.ts에서 처리
);

export { axiosCommonInstance, axiosAuthInstance };
