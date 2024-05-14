import { AxiosError } from 'axios';

interface ErrorResponse {
  result?: string;
  code?: string;
  message?: string;
}

const refresh = async (error: AxiosError) => {
  const errorMessage = (error.response?.data as ErrorResponse)?.message;
  console.log("Axios 에러메세지 확인 :", error.response)

  if (errorMessage === "No Token") {
    localStorage.setItem('accessToken', '');
    window.location.href = '/login';
    console.log("토큰 만료")
  }

  return Promise.reject(error);
};

export default refresh;